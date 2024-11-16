import express from "express";
import { chatController } from "../controllers/chatController";
import { newChatController } from "../controllers/newChatController";
import { getAllChatsController } from "../controllers/getAllChatsController";

const router = express.Router();

router.post("/chat", chatController);
router.post("/new-chat", newChatController);
router.post("/get-chats", getAllChatsController);

export default router;
