import { Response, Request } from "express";
import Chat from "../models/Chat";

export const removeChatController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }
    const result = await Chat.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error: any) {
    console.log("Error fetching chats", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove chat",
      error: error?.message || "Unknown error",
    });
  }
};
