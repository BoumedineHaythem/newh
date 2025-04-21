import ViewApplication from "../models/ViewApplication.js";

export const getAllViewApplications = async (req, res) => {
  try {
    const applications = await ViewApplication.find()
      .populate("companyId", "name") // Optionally populate company data
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


export const getViewApplicationById = async (req, res) => {
  try {
    const application = await ViewApplication.findById(req.params.id)
      .populate("companyId", "name");
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ error: "Failed to fetch application" });
  }
};


export const createViewApplication = async (req, res) => {
  try {
    const { _id, name, projectTitle, location, imgSrc, companyId, solutionLink } = req.body;

    const newApplication = new ViewApplication({
      _id,
      name,
      projectTitle,
      location,
      imgSrc,
      companyId,
      solutionLink,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error creating view application:", error);
    res.status(500).json({ error: "Failed to create application" });
  }
};


export const updateViewApplication = async (req, res) => {
  try {
    const { name, projectTitle, location, imgSrc, solutionLink } = req.body;

    const updatedApplication = await ViewApplication.findByIdAndUpdate(
      req.params.id,
      { name, projectTitle, location, imgSrc, solutionLink },
      { new: true } // Return the updated application
    );

    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating view application:", error);
    res.status(500).json({ error: "Failed to update application" });
  }
};

// @desc Delete a view application
// @route DELETE /api/viewapplications/:id
// @access Private
export const deleteViewApplication = async (req, res) => {
  try {
    await ViewApplication.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting view application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};
