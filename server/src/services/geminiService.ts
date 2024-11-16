import { GoogleGenerativeAI } from "@google/generative-ai";
import { environment } from "../config/environment";

const genAI = new GoogleGenerativeAI(environment.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat();

export const generateText = async (prompt: string): Promise<any> => {
  try {
    const result = await chat.sendMessage(prompt);
    const history = chat.getHistory();
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate response from Gemini AI.");
  }
};
