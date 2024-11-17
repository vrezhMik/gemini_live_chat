"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const errorHandler_1 = require("./utils/errorHandler");
const environment_1 = require("./config/environment");
const db_1 = require("./config/db");
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(authMiddleware_1.authMiddleware);
app.use("/", chatRoutes_1.default);
app.use(errorHandler_1.errorHandler);
io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on("chat-updated", (data) => {
        console.log("Chat updated:", data);
        io.emit("chat-updated", data);
    });
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
server.listen(environment_1.environment.port, () => {
    console.log(`Server running at http://localhost:${environment_1.environment.port}`);
});
