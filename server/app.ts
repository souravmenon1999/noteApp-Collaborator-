import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import notesRoutes from "./routes/notesRoutes";
import { User } from "./models/users"; // Import explicitly
import { Note } from "./models/notes";
import mongoose from "mongoose";


dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    credentials: true, // Allow cookies and credentials
  }));
app.use(bodyParser.json());

//routes
app.use('/notes', notesRoutes);

// MongoDB Connection
connectDB();
console.log(mongoose.modelNames());

export default app;
