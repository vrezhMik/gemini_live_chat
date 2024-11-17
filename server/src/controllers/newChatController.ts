import { Request, Response } from "express";
import { getNextSequence } from "../utils/getNextSequence";
import Chat from "../models/Chat";
import Conversation from "../models/Conversation";

export const newChatController = async (req: Request, res: Response) => {
  try {
    const nextId = await getNextSequence("history_id");
    const newChat = new Chat({
      _id: nextId,
      name: "New Chat",
    });
    await newChat.save();

    const nextConversationId = await getNextSequence("conversation_id");
    const newConversation = new Conversation({
      _id: nextConversationId,
      chat_id: nextId,
      messages: [],
    });
    newConversation.save();
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
