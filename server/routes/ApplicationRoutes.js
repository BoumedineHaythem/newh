import express from "express";
import {
  getAllApplications,
  getUserApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Route to get all applications
router.get("/", getAllApplications);

// Route to get applications for a specific user
router.get("/user/:userId", getUserApplications);

// Route to create a new application
router.post("/", createApplication);

// Route to update the status of an application
router.put("/:id/status", updateApplicationStatus);

// Route to delete an application
router.delete("/:id", deleteApplication);

export default router;
