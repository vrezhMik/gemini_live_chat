import { Response, Request } from "express";
import Chat from "../models/Chat";

export const renameChatController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id, name } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Chat Name is required",
      });
    }
    const result = await Chat.updateOne({ _id: id }, { $set: { name } });

    if (result.matchedCount > 0) {
      console.log("Successfully updated the document:", result);
      return res.status(200).json({
        success: true,
        message: "Chat name updated successfully",
      });
    } else {
      console.log("No document matched the provided ID.");
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
  } catch (err) {
    console.error("Error updating document:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
