import mongoose from "mongoose";
import { User } from "../models/users"; // Import explicitly
import { Note } from "../models/notes"; // Import explicitly
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI not defined in environment variables");
    }
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;
