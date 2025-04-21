import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String }, // Assuming this will store a URL or path to the image
});

const Company = mongoose.model("Company", companySchema);

export default Company;
