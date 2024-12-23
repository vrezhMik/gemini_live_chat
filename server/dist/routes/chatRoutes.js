"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const newChatController_1 = require("../controllers/newChatController");
const getAllChatsController_1 = require("../controllers/getAllChatsController");
const removeChatController_1 = require("../controllers/removeChatController");
const renameChatController_1 = require("../controllers/renameChatController");
const getAllConversationsController_1 = require("../controllers/getAllConversationsController");
const router = express_1.default.Router();
router.post("/chat", chatController_1.chatController);
router.post("/new-chat", newChatController_1.newChatController);
router.post("/get-chats", getAllChatsController_1.getAllChatsController);
router.post("/get-conversations", getAllConversationsController_1.getAllConversationsController);
router.post("/remove-chat", removeChatController_1.removeChatController);
router.post("/rename-chat", renameChatController_1.renameChatController);
router.post("/abort-message", chatController_1.abortChat);
exports.default = router;
