import { GoogleGenerativeAI } from "@google/generative-ai";
import { environment } from "../config/environment";

const genAI = new GoogleGenerativeAI(environment.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate response from Gemini AI.");
  }
};
