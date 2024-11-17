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
exports.abortChat = exports.chatController = void 0;
const geminiService_1 = require("../services/geminiService");
const Conversation_1 = __importDefault(require("../models/Conversation"));
const abortControllers = new Map();
const chatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, chat_id } = req.body;
    if (!prompt || !chat_id) {
        res.status(400).json({ error: "Prompt and chat_id are required." });
        return;
    }
    const abortController = new AbortController();
    abortControllers.set(chat_id, abortController);
    try {
        const conversation = yield Conversation_1.default.findOne({ chat_id });
        if (!conversation) {
            res.status(404).json({ error: "Conversation not found." });
            return;
        }
        const clientMessage = {
            type: "client",
            prompt,
            timestamp: new Date(),
        };
        conversation.messages.push(clientMessage);
        const responseContent = yield (0, geminiService_1.generateText)(prompt, conversation.id, abortController.signal);
        const serverMessage = {
            type: "server",
            prompt: responseContent,
            timestamp: new Date(),
        };
        conversation.messages.push(serverMessage);
        yield conversation.save();
        res.status(200).json({ reply: responseContent });
    }
    catch (error) {
        if (abortController.signal.aborted) {
            res.status(200).json({ error: "Request was aborted by the client." });
        }
        else {
            console.error("Chat Controller Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    finally {
        abortControllers.delete(chat_id);
    }
});
exports.chatController = chatController;
const abortChat = (req, res) => {
    const { chat_id } = req.body;
    if (!chat_id) {
        res.status(400).json({ error: "chat_id is required." });
        return;
    }
    const abortController = abortControllers.get(chat_id);
    if (abortController) {
        abortController.abort();
        abortControllers.delete(chat_id);
        res.status(200).json({ message: "Request aborted successfully." });
    }
    else {
        res
            .status(404)
            .json({ error: "No active request found for this chat_id." });
    }
};
exports.abortChat = abortChat;
