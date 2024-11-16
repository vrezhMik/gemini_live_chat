import express from "express";
import { chatController } from "../controllers/chatController";
import { newChatController } from "../controllers/newChatController";

const router = express.Router();

router.post("/chat", chatController);
router.post("/new-chat", newChatController);

export default router;
