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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateText = void 0;
const generative_ai_1 = require("@google/generative-ai");
const environment_1 = require("../config/environment");
const genAI = new generative_ai_1.GoogleGenerativeAI(environment_1.environment.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat();
const generateText = (prompt, id, signal) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const abortHandler = () => {
            console.log("Abort signal received. Cleaning up resources...");
            reject(new Error("Operation aborted"));
        };
        signal.addEventListener("abort", abortHandler);
        try {
            const newPrompt = `Conversation ID: ${id}\n${prompt}`;
            const result = yield chat.sendMessage(newPrompt);
            signal.removeEventListener("abort", abortHandler);
            resolve(result);
        }
        catch (error) {
            if (signal.aborted) {
                console.log("Operation was aborted.");
                reject(new Error("Request was aborted by the client."));
            }
            else {
                console.error("Gemini API Error:", error);
                reject(new Error("Failed to generate response from Gemini AI."));
            }
        }
        finally {
            signal.removeEventListener("abort", abortHandler);
        }
    }));
});
exports.generateText = generateText;
