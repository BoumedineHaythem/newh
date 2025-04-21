import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection initiated");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }

};




export default connectDB;


