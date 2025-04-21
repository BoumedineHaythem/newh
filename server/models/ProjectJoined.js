import mongoose from "mongoose";

const projectJoinedSchema = new mongoose.Schema({
  companyId: { type: String, ref: "Company", required: true }, // Reference to Company
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true, enum: ["Pending", "Accepted", "Rejected"] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

const ProjectJoined = mongoose.model("ProjectJoined", projectJoinedSchema);

export default ProjectJoined;