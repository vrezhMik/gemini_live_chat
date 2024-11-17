import { Request, Response } from "express";
import { generateText } from "../services/geminiService";
import Conversation from "../models/Conversation";

const abortControllers = new Map<string, AbortController>();

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

  const abortController = new AbortController();
  abortControllers.set(chat_id, abortController);

  try {
    const conversation = await Conversation.findOne({ chat_id });
    if (!conversation) {
      res.status(404).json({ error: "Conversation not found." });
      return;
    }

    const clientMessage: Message = {
      type: "client",
      prompt,
      timestamp: new Date(),
    };
    conversation.messages.push(clientMessage);

    const responseContent = await generateText(
      prompt,
      conversation.id,
      abortController.signal
    );

    const serverMessage: Message = {
      type: "server",
      prompt: responseContent,
      timestamp: new Date(),
    };

    conversation.messages.push(serverMessage);

    await conversation.save();

    res.status(200).json({ reply: responseContent });
  } catch (error) {
    if (abortController.signal.aborted) {
      res.status(200).json({ error: "Request was aborted by the client." });
    } else {
      console.error("Chat Controller Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } finally {
    abortControllers.delete(chat_id);
  }
};

export const abortChat = (req: Request, res: Response): void => {
  const { chat_id } = req.body;

  if (!chat_id) {
    res.status(400).json({ error: "chat_id is required." });
    return;
  }

  const abortController = abortControllers.get(chat_id);

  if (abortController) {
    abortController.abort();
    abortControllers.delete(chat_id);
    res.status(200).json({ message: "Request aborted successfully." });
  } else {
    res
      .status(404)
      .json({ error: "No active request found for this chat_id." });
  }
};
