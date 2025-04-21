import ProjectJoined from '../models/ProjectJoined.js';
import * as Sentry from "@sentry/node";

// Get all projects joined by a specific user
export const getUserJoinedProjects = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find all projects where the userId matches
    const joinedProjects = await ProjectJoined.find({ userId });
    
    res.status(200).json(joinedProjects);
  } catch (error) {
    console.error('Error fetching user joined projects:', error);
    Sentry.captureException(error);
    res.status(500).json({
      message: "Error fetching user's joined projects",
      error: error.message
    });
  }
};

// Get a specific joined project by ID
export const getJoinedProjectById = async (req, res) => {
  try {
    const joinedProject = await ProjectJoined.findById(req.params.id);
    
    if (!joinedProject) {
      return res.status(404).json({ message: "Joined project not found" });
    }
    
    res.status(200).json(joinedProject);
  } catch (error) {
    console.error('Error fetching joined project by ID:', error);
    Sentry.captureException(error);
    res.status(500).json({
      message: "Error fetching joined project",
      error: error.message
    });
  }
};

export const getAllJoinedProjects = async (req, res) => {
  try {
    const joinedProjects = await ProjectJoined.find()
      .sort({ date: -1 });
    
    res.status(200).json(joinedProjects);
  } catch (error) {
    console.error('Error fetching all joined projects:', error);
    Sentry.captureException(error);
    res.status(500).json({
      message: "Error fetching all joined projects",
      error: error.message
    });
  }
};
















// Join a new project
export const joinProject = async (req, res) => {
  try {
    console.log("Received project join data:", req.body);
    
    // Validate required fields
    const requiredFields = ['companyId', 'projectId', 'title', 'userId', 'userEmail', 'description'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        missingFields: missingFields 
      });
    }
    
    // Check if user already joined this project
    const existingJoin = await ProjectJoined.findOne({
      userId: req.body.userId,
      projectId: req.body.projectId
    });
    
    if (existingJoin) {
      return res.status(400).json({ message: "You have already joined this project" });
    }
    
    // Create new project join with default values where needed
    const newJoinedProject = new ProjectJoined({
      companyId: req.body.companyId,
      projectId: req.body.projectId,
      title: req.body.title,
      location: req.body.location || "Remote", // Default location
      date: req.body.date || new Date().toISOString(), // Default to current date
      status: req.body.status || 'Pending',
      userId: req.body.userId,
      userEmail: req.body.userEmail,
      description: req.body.description,
      submissionUrl: req.body.submissionUrl || '',
      submissionFile: req.body.submissionFile || ''
    });
    
    await newJoinedProject.save();
    console.log("Saved joined project:", newJoinedProject);
    
    // Return complete saved object with all fields
    res.status(201).json({
      message: "Successfully joined project",
      joinedProject: newJoinedProject
    });
  } catch (error) {
    console.error('Error joining project:', error);
    Sentry.captureException(error);
    res.status(500).json({
      message: "Error joining project",
      error: error.message
    });
  }
};

// Update joined project status
export const updateJoinedProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    
    const updatedJoinedProject = await ProjectJoined.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedJoinedProject) {
      return res.status(404).json({ message: "Joined project not found" });
    }
    
    res.status(200).json({
      message: "Project status updated",
      joinedProject: updatedJoinedProject
    });
  } catch (error) {
    console.error('Error updating project status:', error);
    Sentry.captureException(error);
    res.status(500).json({
      message: "Error updating joined project status",
      error: error.message
    });
  }
};

// Delete a joined project
export const deleteJoinedProject = async (req, res) => {
  try {
    const deletedJoinedProject = await ProjectJoined.findByIdAndDelete(req.params.id);
    
    if (!deletedJoinedProject) {
      return res.status(404).json({ message: "Joined project not found" });
    }
    
    res.status(200).json({ message: "Joined project deleted successfully" });
  } catch (error) {
    console.error('Error deleting project:', error);
    Sentry.captureException(error);
    res.status(500).json({
      message: "Error deleting joined project",
      error: error.message
    });
  }
};
