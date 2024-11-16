import { Request, Response } from "express";
import { generateText } from "../services/geminiService";

export const chatController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt } = req.body;
  console.log(prompt);
  if (!prompt) {
    res.status(400).json({ error: "Prompt is required." });
    return;
  }
  try {
    const response = await generateText(prompt);

    res.status(200).json({ reply: response });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
