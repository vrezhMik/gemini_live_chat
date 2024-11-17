import { Response, Request } from "express";
import Conversation from "../models/Conversation";

export const getAllConversationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body;
    const conversation = await Conversation.findOne({ chat_id: id });
    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error: any) {
    console.log("Error fetching chats", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
      error: error?.message || "Unknown error",
    });
  }
};
