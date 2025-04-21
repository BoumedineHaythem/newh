import mongoose from "mongoose";

const manageProjectSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  date: { type: Number, required: true },
  location: { type: String, required: true },
  participants: { type: Number, required: true },
  companyId: { type: String, ref: "Company", required: true }, // Reference to Company
});

const ManageProject = mongoose.model("ManageProject", manageProjectSchema);

export default ManageProject;