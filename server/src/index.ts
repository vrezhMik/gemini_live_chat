import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import chatRoutes from "./routes/chatRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./utils/errorHandler";
import { environment } from "./config/environment";
import { connectDB } from "./config/db";

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);

app.use("/", chatRoutes);

app.use(errorHandler);

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

server.listen(environment.port, () => {
  console.log(`Server running at http://localhost:${environment.port}`);
});
