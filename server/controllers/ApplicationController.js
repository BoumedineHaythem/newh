import Application from "../models/Application.js";

// @desc Get all applications
// @route GET /api/applications
// @access Public
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "name email") // Optionally populate the user data
      .populate("projectId", "title location"); // Optionally populate the project data
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

// @desc Get applications for a specific user
// @route GET /api/applications/user/:userId
// @access Private (User-specific)
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .populate("projectId", "title location");
    res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ error: "Failed to fetch user applications" });
  }
};

// @desc Create a new application
// @route POST /api/applications
// @access Private (Only authenticated users can submit applications)
export const createApplication = async (req, res) => {
  try {
    const { userId, projectId, solutionLink } = req.body;

    const newApplication = new Application({
      userId,
      projectId,
      solutionLink,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Failed to create application" });
  }
};

// @desc Update the status of an application
// @route PUT /api/applications/:id/status
// @access Private (Admin or project owner)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
};

// @desc Delete an application
// @route DELETE /api/applications/:id
// @access Private (Only authorized users or admins can delete applications)
export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};
