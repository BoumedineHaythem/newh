// models/ProjectJoined.js
import mongoose from "mongoose";

const projectJoinedSchema = new mongoose.Schema({
  companyId: { type: String, ref: "Company", required: true },
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userEmail: { type: String, required: true },
  description: { type: String, required: true },
  submissionUrl: { type: String, default: "" },
  submissionFile: { type: String, default: "" },
}, { timestamps: true });

const ProjectJoined = mongoose.model("ProjectJoined", projectJoinedSchema);
export default ProjectJoined;