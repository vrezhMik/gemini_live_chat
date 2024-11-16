import express from "express";
import { chatController } from "../controllers/chatController";
import { newChatController } from "../controllers/newChatController";
import { getAllChatsController } from "../controllers/getAllChatsController";
import { removeChatController } from "../controllers/removeChatController";

const router = express.Router();

router.post("/chat", chatController);
router.post("/new-chat", newChatController);
router.post("/get-chats", getAllChatsController);
router.post("/remove-chat", removeChatController);

export default router;
