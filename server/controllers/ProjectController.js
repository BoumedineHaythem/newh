import Project from "../models/Project.js";

// @desc Get all projects
// @route GET /api/projects
// @access Public
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ postedDate: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// @desc Get a single project
// @route GET /api/projects/:id
// @access Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// @desc Create a new project
// @route POST /api/projects
// @access Private
export const createProject = async (req, res) => {
  try {
    // Ensure postedDate is included
    const projectData = {
      ...req.body,
      postedDate: req.body.postedDate || Date.now()
    };
    
    const newProject = new Project(projectData);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({
      error: "Failed to create project",
      details: error.message
    });
  }
};

// @desc Update a project
// @route PUT /api/projects/:id
// @access Private
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
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
};

// @desc Delete a project
// @route DELETE /api/projects/:id
// @access Private
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

// @desc Upload file for a project
// @route POST /api/projects/:id/upload
// @access Private
export const uploadProjectFile = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    // Handle file upload logic here
    // You would typically use a library like multer to handle file uploads
    
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(400).json({ error: "Failed to upload file" });
  }
};