import { io, Socket } from "socket.io-client";
import { IChat } from "./types";

let socket: Socket;

export const useWebSocket = () => {
  const connectWebSocket = () => {
    if (!socket) {
      socket = io("http://localhost:5002");
      console.log("WebSocket Connected");
    }
  };

  const onChatUpdated = (
    callback: (chat: IChat) => void
  ): (() => void) | undefined => {
    if (!socket) return;
    const handler = (updatedChat: IChat) => {
      callback(updatedChat);
    };

    socket.on("chat-updated", handler);
    return () => {
      if (socket) {
        socket.off("chat-updated", handler);
        console.log("Listener for 'chat-updated' removed");
      }
    };
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.disconnect();
      console.log("WebSocket disconnected");
    }
  };

  return { connectWebSocket, onChatUpdated, disconnectWebSocket };
};
