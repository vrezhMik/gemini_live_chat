import { io, Socket } from "socket.io-client";
import { IChat } from "./types";

let socket: Socket;

export const useWebSocket = () => {
  const connectWebSocket = () => {
    if (!socket) {
      socket = io("http://localhost:5002");
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
      }
    };
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return { connectWebSocket, onChatUpdated, disconnectWebSocket };
};
