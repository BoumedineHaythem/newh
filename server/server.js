import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Company from "./models/Company.js";
import Project from "./models/Project.js";
import ManageProject from "./models/ManageProject.js";
import ProjectJoined from "./models/ProjectJoined.js";
import ViewApplication from "./models/ViewApplication.js";
import { Companies, projectsData, manageProjectsData, projectsJoined, viewApplicationsPageData } from "./assets/assets.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", (req, res) => clerkWebhooks(req, res, mongoose));

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json({ _id: user._id, name: user.name, email: user.email, image: user.image });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/companies", async (req, res) => {
  const { name, email, image } = req.body;
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company email already exists" });
    }
    const company = new Company({ _id: name.toLowerCase().replace(/\s+/g, ""), name, email, image });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/admin/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("companyId", "name email");
    res.json(projects);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin: Delete a project
app.delete("/api/admin/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Submit an application
app.post("/api/applications", async (req, res) => {
  const { userId, projectId, solutionLink } = req.body;
  try {
    const application = new Application({ userId, projectId, solutionLink });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get applications for a project (for company/admin)
app.get("/api/projects/:id/applications", async (req, res) => {
  try {
    const applications = await Application.find({ projectId: req.params.id }).populate("userId", "name email image");
    res.json(applications);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password, name, image } = req.body;
  console.log("Register request received:", { email, password, name, image });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, image });
    await user.save();
    console.log("User registered successfully:", user);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, image: user.image });
  } catch (error) {
    console.error("Registration error:", error.message);
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Seed Database Route (Run this once to populate the database)
app.post("/api/seed", async (req, res) => {
  try {
    // Clear existing data (optional, remove if you don't want to overwrite)
    await Company.deleteMany({});
    await Project.deleteMany({});
    await ManageProject.deleteMany({});
    await ProjectJoined.deleteMany({});
    await ViewApplication.deleteMany({});

    // Insert Companies
    await Company.insertMany(Companies.map(c => ({ ...c, image: c.image || "" })));

    // Insert Projects
    await Project.insertMany(projectsData);

    // Insert Manage Projects
    await ManageProject.insertMany(manageProjectsData);

    // Insert Projects Joined (assuming a user exists, replace with real userId if needed)
    const user = await User.findOne(); // Get a sample user
    if (!user) throw new Error("No user found to associate with ProjectsJoined");
    await ProjectJoined.insertMany(
      projectsJoined.map(pj => ({ ...pj, userId: user._id }))
    );

    // Insert View Applications
    await ViewApplication.insertMany(viewApplicationsPageData);

    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error.message);
    Sentry.captureException(error);
    res.status(500).json({ message: "Failed to seed database", error: error.message });
  }
});

// Basic CRUD Routes (example for Projects)
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("companyId", "name email");

    // If no projects were found in the database, return the default project data from assets
    if (!projects || projects.length === 0) {
      console.log("No projects in database, returning default project data from assets");
      return res.json(projectsData);
    }

    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    Sentry.captureException(error);

    // In case of error, fall back to the default project data
    console.log("Error occurred, returning default project data from assets");
    return res.json(projectsData);
  }
});

Sentry.setupExpressErrorHandler(app);

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Failed to connect to MongoDB and listen to the port:", err);
  });