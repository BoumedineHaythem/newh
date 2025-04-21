import express from 'express';
import {
  getUserJoinedProjects,
  getJoinedProjectById,
  joinProject,
  updateJoinedProjectStatus,
  deleteJoinedProject,
  getAllJoinedProjects // Add this import
} from '../controllers/projectJoinedController.js';

const router = express.Router();

// Add this new route to get all joined projects
router.get('/', getAllJoinedProjects);

// Keep existing routes
router.get('/user/:userId', getUserJoinedProjects);
router.get('/:id', getJoinedProjectById);
router.post('/', joinProject);
router.put('/:id/status', updateJoinedProjectStatus);
router.delete('/:id', deleteJoinedProject);

export default router;