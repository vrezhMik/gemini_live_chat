"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newChatController = void 0;
const getNextSequence_1 = require("../utils/getNextSequence");
const Chat_1 = __importDefault(require("../models/Chat"));
const Conversation_1 = __importDefault(require("../models/Conversation"));
const newChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nextId = yield (0, getNextSequence_1.getNextSequence)("history_id");
        const newChat = new Chat_1.default({
            _id: nextId,
            name: "New Chat",
        });
        yield newChat.save();
        const nextConversationId = yield (0, getNextSequence_1.getNextSequence)("conversation_id");
        const newConversation = new Conversation_1.default({
            _id: nextConversationId,
            chat_id: nextId,
            messages: [],
        });
        newConversation.save();
        res.status(201).json({
            success: true,
            message: "Chat created successfully",
            chat: newChat,
        });
    }
    catch (error) {
        console.log("Error creating chat:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create chat",
            error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
        });
    }
});
exports.newChatController = newChatController;
