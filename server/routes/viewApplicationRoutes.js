import express from "express";
import {
  getAllViewApplications,
  getViewApplicationById,
  createViewApplication,
  updateViewApplication,
  deleteViewApplication,
} from "../controllers/viewApplicationController.js";

const router = express.Router();

// Route to get all view applications
router.get("/", getAllViewApplications);

// Route to get a single view application by ID
router.get("/:id", getViewApplicationById);

// Route to create a new view application
router.post("/", createViewApplication);

// Route to update an existing view application
router.put("/:id", updateViewApplication);

// Route to delete a view application
router.delete("/:id", deleteViewApplication);

export default router;
