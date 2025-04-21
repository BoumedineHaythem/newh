import mongoose from "mongoose";

const viewApplicationSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  projectTitle: { type: String, required: true },
  location: { type: String, required: true },
  imgSrc: { type: String }, // Assuming this will store a URL or path to the image
  companyId: { type: String, ref: "Company", required: true }, // Reference to Company
  solutionLink: { type: String, required: true },
});

const ViewApplication = mongoose.model("ViewApplication", viewApplicationSchema);

export default ViewApplication;
