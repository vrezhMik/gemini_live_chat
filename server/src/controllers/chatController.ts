import { Request, Response } from "express";
import { generateText } from "../services/geminiService";
import Conversation from "../models/Conversation";

type Message = {
  type: string;
  prompt: any;
  timestamp: Date;
};

export const chatController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt, chat_id } = req.body;

  if (!prompt || !chat_id) {
    res.status(400).json({ error: "Prompt and chat_id are required." });
    return;
  }

  try {
    const conversation = await Conversation.findOne({ chat_id });
    if (!conversation) {
      res.status(404).json({ error: "Conversation not found." });
      return;
    }
    const clientMessage: Message = {
      type: "client",
      prompt: prompt,
      timestamp: new Date(),
    };
    conversation.messages.push(clientMessage);

    const responseContent = await generateText(prompt);

    const serverMessage: Message = {
      type: "server",
      prompt: responseContent,
      timestamp: new Date(),
    };

    conversation.messages.push(serverMessage);

    await conversation.save();

    res.status(200).json({ reply: responseContent });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
