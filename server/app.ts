import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



// MongoDB Connection
connectDB();

export default app;
