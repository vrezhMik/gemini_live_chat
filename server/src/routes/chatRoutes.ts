import express, { Request, Response } from "express";
import { chatController } from "../controllers/chatController";
import { newChatController } from "../controllers/newChatController";
import { getAllChatsController } from "../controllers/getAllChatsController";
import { removeChatController } from "../controllers/removeChatController";
import { renameChatController } from "../controllers/renameChatController";

const router = express.Router();

router.post("/chat", chatController);
router.post("/new-chat", newChatController);
router.post("/get-chats", getAllChatsController);
router.post("/get-history", (req: Request, res: Response) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({ error: "ID is required" });
  }
  // Your logic here
  res.status(200).json({ message: "Success", id });
});
router.post("/remove-chat", removeChatController);
router.post("/rename-chat", renameChatController);

export default router;
