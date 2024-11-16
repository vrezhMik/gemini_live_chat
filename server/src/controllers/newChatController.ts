import { Request, Response } from "express";
import { getNextSequence } from "../utils/getNextSequence";
import Chat from "../models/Chat";

export const newChatController = async (req: Request, res: Response) => {
  try {
    const nextId = await getNextSequence("history_id");
    const newChat = new Chat({
      _id: nextId,
      name: "New Chat",
    });
    await newChat.save();

    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat: newChat,
    });
  } catch (error: any) {
    console.log("Error creating chat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create chat",
      error: error?.message || "Unknown error",
    });
  }
};
