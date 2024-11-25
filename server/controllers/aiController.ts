import { Request, Response } from "express";
import { generateAIContent } from "../services/aiService";

export const getAIContent = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const content = await generateAIContent(prompt);
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate content" });
  }
};
