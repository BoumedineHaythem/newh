import express from 'express';
import { getAllProjects, createProject, uploadProjectFile } from '../controllers/projectController.js';
import Project from '../models/Project.js';
import Application from '../models/Application.js'; // Add this import for the projectjoined endpoint

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', getAllProjects);

// POST /api/projects - Create a new project
router.post('/', createProject);

// POST /api/projects/:id/upload - Upload file for a project
router.post('/:id/upload', uploadProjectFile);

// GET /api/projects/:id - Get a specific project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// PUT /api/projects/:id - Update a project
router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(400).json({ error: 'Failed to update project' });
    }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// GET /api/projectjoined - Get projects a user has joined
router.get('/projectjoined', async (req, res) => {
    try {
        const userId = req.query.userId;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        // Find applications with status "Accepted" for this user
        const acceptedApplications = await Application.find({
            userId: userId,
            status: "Accepted" // Assuming "Accepted" means the user has joined
        }).populate('projectId');
        
        // Extract project details from applications
        const joinedProjects = acceptedApplications.map(app => app.projectId);
        
        res.json(joinedProjects);
    } catch (error) {
        console.error('Error fetching joined projects:', error);
        res.status(500).json({ error: 'Failed to fetch joined projects' });
    }
});

export default router;