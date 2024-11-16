import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const environment = {
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  port: process.env.PORT || 5001,
};
