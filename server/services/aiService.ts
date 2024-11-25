import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
console.log(apiKey);


if (!apiKey) {
  throw new Error("API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIContent = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Extract and return the response text
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw new Error("Failed to generate AI content.");
  }
};
