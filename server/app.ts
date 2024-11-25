import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import notesRoutes from "./routes/notesRoutes";
import aiRoutes from "./routes/aiRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true, // Allow cookies and credentials
}));
app.use(bodyParser.json());

// API Routes
app.use('/notes', notesRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB Connection
connectDB();

export default app;
