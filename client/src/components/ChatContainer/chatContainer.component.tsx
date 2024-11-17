import { useEffect, useState } from "react";
import MessageInput from "../MessageInput/messageInput.component";
import MessagesContainer from "../MessagesContainer/messagesContainer.component";
import style from "./ChatContainer.module.scss";
import { Message, Prompt } from "../../utils/types";
import { useActiveId, useIsChoosed } from "../../store/store";

type ExtendedMessage = Message & { prompt: Prompt; type: string };

export default function ChatContainer() {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const { activeId } = useActiveId();
  const { isChoosed, setIsChoosed } = useIsChoosed();

  useEffect(() => {
    const updateMessages = async () => {
      if (activeId >= -1) {
        const response = await fetch(
          "http://localhost:5002/get-conversations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: activeId }),
          }
        );
        const data = await response.json();
        if (data.conversation) {
          const formattedMessages = data.conversation?.messages.map(
            (msg: Message) => ({
              ...msg,
              prompt:
                typeof msg.prompt === "string"
                  ? {
                      response: {
                        candidates: [
                          { content: { parts: [{ text: msg.prompt }] } },
                        ],
                      },
                    }
                  : msg.prompt,
            })
          );
          setMessages(formattedMessages);
        }
      }
      setIsChoosed(false);
    };
    updateMessages();
  }, [isChoosed]);

  const handleSendMessage = async (message: string, id: number) => {
    const userMessage: ExtendedMessage = {
      type: "client",
      prompt: {
        response: { candidates: [{ content: { parts: [{ text: message }] } }] },
      },
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5002/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            userMessage.prompt.response.candidates[0].content.parts[0].text,
          chat_id: id,
        }),
      });
      const data = await response.json();
      const serverMessage: ExtendedMessage = {
        type: "server",
        prompt: data.reply,
      };
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
