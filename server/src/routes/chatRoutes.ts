import express, { Request, Response } from "express";
import { abortChat, chatController } from "../controllers/chatController";
import { newChatController } from "../controllers/newChatController";
import { getAllChatsController } from "../controllers/getAllChatsController";
import { removeChatController } from "../controllers/removeChatController";
import { renameChatController } from "../controllers/renameChatController";
import { getAllConversationsController } from "../controllers/getAllConversationsController";

const router = express.Router();

router.post("/chat", chatController);
router.post("/new-chat", newChatController);
router.post("/get-chats", getAllChatsController);
router.post("/get-conversations", getAllConversationsController);
router.post("/remove-chat", removeChatController);
router.post("/rename-chat", renameChatController);
router.post("/abort-message", abortChat);

export default router;
