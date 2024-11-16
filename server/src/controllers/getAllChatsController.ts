import { Response, Request } from "express";
import Chat from "../models/Chat";

export const getAllChatsController = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find({});
    res.status(200).json({
      success: true,
      chats,
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
