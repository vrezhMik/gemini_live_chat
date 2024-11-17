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
exports.removeChatController = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const Conversation_1 = __importDefault(require("../models/Conversation"));
const removeChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Chat ID is required",
            });
        }
        const removeChat = yield Chat_1.default.deleteOne({ _id: id });
        const removeConversation = yield Conversation_1.default.deleteOne({ chat_id: id });
        if (removeChat.deletedCount === 0 ||
            removeConversation.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });
    }
    catch (error) {
        console.log("Error fetching chats", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove chat",
            error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
        });
    }
});
exports.removeChatController = removeChatController;
