import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Import models
import User from "./models/User.js";
import Company from "./models/Company.js";
import Project from "./models/Project.js";
import ManageProject from "./models/ManageProject.js";
import ProjectJoined from "./models/ProjectJoined.js";
import ViewApplication from "./models/ViewApplication.js";
import Application from "./models/Application.js";

// Import route files
import projectJoinedRoutes from './routes/projectJoinedRoutes.js';
import applicationRoutes from "./routes/applicationRoutes.js"; 
import viewApplicationRoutes from "./routes/viewApplicationRoutes.js"; 
import userRoutes from "./routes/userRoutes.js"; 
import manageProjectRoutes from "./routes/manageProjectRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Initialize the app
const app = express();
app.use('/uploads', express.static('uploads'));

// Middlewares
// Set up CORS with specific configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
Sentry.init({ dsn: process.env.SENTRY_DSN });  // Setup Sentry

// Basic Routes
app.get("/", (req, res) => res.send("API working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Route imports - fixed duplicate route registration
app.use("/api/upload", uploadRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/viewapplications", viewApplicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projectjoined", projectJoinedRoutes); // THIS IS THE CORRECT WAY
app.use("/api/manageprojects", manageProjectRoutes);
app.use("/api/projects", projectRoutes);

// Webhook Route
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

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password, name, image, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ 
      email, 
      password: hashedPassword, 
      name, 
      image,
      role: role || "user"
    });
    
    await user.save();

    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      image: user.image,
      role: user.role
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route for creating a company
app.post("/api/companies", async (req, res) => {
  const { name, email, image } = req.body;
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) return res.status(400).json({ message: "Company email already exists" });

    const company = new Company({ _id: name.toLowerCase().replace(/\s+/g, ""), name, email, image });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found in the database." });
    }
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    Sentry.captureException(error);
    return res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
});

// Submit an application
app.post("/api/applications", async (req, res) => {
  const { userId, projectId, solutionLink } = req.body;
  try {
    if (!userId || !projectId || !solutionLink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const application = new Application({ userId, projectId, solutionLink });
    await application.save();

    res.status(201).json(application);
  } catch (error) {
    console.error("Error creating application:", error);
    Sentry.captureException(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



// Add this to your server code
app.get("/api/check-collections", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    // Get count of documents in each collection
    const counts = {};
    for (const name of collectionNames) {
      counts[name] = await mongoose.connection.db.collection(name).countDocuments();
    }
    
    res.json({
      collections: collectionNames,
      documentCounts: counts
    });
  } catch (error) {
    console.error("Error checking collections:", error);
    res.status(500).json({ error: error.message });
  }
});













// Get applications for a project
app.get("/api/projects/:id/applications", async (req, res) => {
  try {
    const applications = await Application.find({ projectId: req.params.id })
      .populate("userId", "name email image");

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this project." });
    }

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    Sentry.captureException(error);
    return res.status(500).json({ message: "Error fetching applications", error: error.message });
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

// Handle errors
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Start the server
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