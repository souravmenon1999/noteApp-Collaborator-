import express from "express";
import { getAIContent } from "../controllers/aiController";

const router = express.Router();

router.post("/generate", getAIContent);

export default router;
