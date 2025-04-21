import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  difficulty: { type: String, required: true },
  companyId: { type: String, ref: "Company", required: true }, // Reference to Company
  description: { type: String, required: true },
  prize: { type: String, required: true },
  duration: { type: String, required: true },
  postedDate: { type: Number, required: true },
  category: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;