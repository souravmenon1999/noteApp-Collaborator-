import { log } from "console";
import openai from "../config/openai.config";

export const handleUserMessage = async (messages: any[]) => {
  try {
   

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
    });
    console.log(response);
    
    return response.choices[0].message.content || "Sorry, I could not process your request.";
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Failed to communicate with OpenAI.");
  }
};