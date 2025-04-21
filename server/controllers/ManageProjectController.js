import ManageProject from "../models/ManageProject.js";

// @desc Get all manage projects
// @route GET /api/manageprojects
// @access Public
export const getAllManageProjects = async (req, res) => {
  try {
    const projects = await ManageProject.find();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// @desc Create a new manage project
// @route POST /api/manageprojects
// @access Private
export const createManageProject = async (req, res) => {
  try {
    const { title, date, location, participants, companyId } = req.body;

    const newProject = new ManageProject({
      title,
      date,
      location,
      participants,
      companyId,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};
