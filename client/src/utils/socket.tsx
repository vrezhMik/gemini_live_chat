import { io, Socket } from "socket.io-client";
import { IChat } from "./types";

let socket: Socket;

export const useWebSocket = () => {
  const connectWebScoket = () => {
    if (!socket) {
      socket = io("http://localhost:5002");
      console.log("WebSocket Connected");
    }
  };

  const onChatUpdated = (callback: (chat: IChat) => void) => {
    if (!socket) return;
    socket.on("chat-updated", (updatedChat: IChat) => {
      callback(updatedChat);
    });
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("WebSocket disconnected");
    }
  };
  return { connectWebScoket, onChatUpdated, disconnectWebSocket };
};
