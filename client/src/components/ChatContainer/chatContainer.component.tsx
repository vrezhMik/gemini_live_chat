import MessageInput from "../MessageInput/messageInput.component";
import MessagesContainer from "../MessagesContainer/messagesContainer.component";
import style from "./ChatContainer.module.scss";
import { useEffect, useState } from "react";
import { Message } from "../../utils/types";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  const handleSendMessage = async (message: string) => {
    const userMessage: Message = { type: "client", prompt: message };
    setMessages((prev) => [...prev, userMessage]); // Add user message

    try {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage.prompt }),
      });
      const data = await response.json();

      const serverMessage: Message = { type: "server", prompt: data?.reply };
      setMessages((prev) => [...prev, serverMessage]);
    } catch (error) {
      console.error("Error fetching server response:", error);
    }
  };

  return (
    <div className={style.chat}>
      <div className={style["chat-container"]}>
        <MessagesContainer messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
