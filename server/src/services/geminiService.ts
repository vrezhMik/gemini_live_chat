import { GoogleGenerativeAI } from "@google/generative-ai";
import { environment } from "../config/environment";

const genAI = new GoogleGenerativeAI(environment.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat();

export const generateText = async (
  prompt: string,
  id: number,
  signal: AbortSignal
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const abortHandler = () => {
      console.log("Abort signal received. Cleaning up resources...");
      reject(new Error("Operation aborted"));
    };

    signal.addEventListener("abort", abortHandler);

    try {
      const newPrompt = `Conversation ID: ${id}\n${prompt}`;
      const result = await chat.sendMessage(newPrompt);
      signal.removeEventListener("abort", abortHandler);
      resolve(result);
    } catch (error) {
      if (signal.aborted) {
        console.log("Operation was aborted.");
        reject(new Error("Request was aborted by the client."));
      } else {
        console.error("Gemini API Error:", error);
        reject(new Error("Failed to generate response from Gemini AI."));
      }
    } finally {
      signal.removeEventListener("abort", abortHandler);
    }
  });
};
