import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectId: { type: String, ref: "Project", required: true },
  solutionLink: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  submittedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;