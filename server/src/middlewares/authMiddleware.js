"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const serverApiKey = process.env.GEMINI_API_KEY;
    if (!serverApiKey) {
        res.status(500).json({ error: "Server misconfiguration: Missing API key" });
        return;
    }
    next();
};
exports.authMiddleware = authMiddleware;
