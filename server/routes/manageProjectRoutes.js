import express from "express";
import { getAllManageProjects, createManageProject } from "../controllers/manageProjectController.js";
import ManageProject from "../models/ManageProject.js";

const router = express.Router();

// Route to get all manage projects
router.get("/", getAllManageProjects);

// Route to create a new manage project
router.post("/", createManageProject);

// Route to update a manage project
router.put("/:id", async (req, res) => {
  try {
    // Vérifier si l'ID est un UUID (avec tirets)
    const projectId = req.params.id;
    
    const updatedProject = await ManageProject.findOneAndUpdate(
      // Si votre projet utilise _id pour MongoDB OU un champ id pour UUID
      { $or: [{ _id: projectId }, { id: projectId }] },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(400).json({ error: "Failed to update project" });
  }
});

// Route to delete a manage project
router.delete("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    
    const deletedProject = await ManageProject.findOneAndDelete(
      { $or: [{ _id: projectId }, { id: projectId }] }
    );
    
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Route to get a specific manage project
router.get("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    
    const project = await ManageProject.findOne(
      { $or: [{ _id: projectId }, { id: projectId }] }
    );
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

export default router;