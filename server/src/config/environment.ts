import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const environment = {
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  port: process.env.PORT || 5002,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/livechat",
};
