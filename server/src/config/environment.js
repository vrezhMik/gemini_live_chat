"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env.local" });
exports.environment = {
    geminiApiKey: process.env.GEMINI_API_KEY || "",
    port: process.env.PORT || 5002,
    mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/livechat",
};
