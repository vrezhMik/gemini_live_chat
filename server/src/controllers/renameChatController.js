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
exports.renameChatController = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const renameChatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield Chat_1.default.updateOne({ _id: id }, { $set: { name } });
        if (result.matchedCount > 0) {
            console.log("Successfully updated the document:", result);
            return res.status(200).json({
                success: true,
                message: "Chat name updated successfully",
            });
        }
        else {
            console.log("No document matched the provided ID.");
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }
    }
    catch (err) {
        console.error("Error updating document:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.renameChatController = renameChatController;
