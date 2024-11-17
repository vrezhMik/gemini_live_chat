import { useEffect, useState } from "react";
import MessageInput from "../MessageInput/messageInput.component";
import MessagesContainer from "../MessagesContainer/messagesContainer.component";
import style from "./ChatContainer.module.scss";
import { Message, Prompt } from "../../utils/types";
import {
  useActiveId,
  useIsChoosed,
  useIsRemoved,
  useIsGenerating,
} from "../../store/store";

type ExtendedMessage = Message & { prompt: Prompt; type: string };

export default function ChatContainer() {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const { activeId } = useActiveId();
  const { isChoosed, setIsChoosed } = useIsChoosed();
  const { isRemoved, setIsRemoved } = useIsRemoved();
  const { isGenerating, setisGenerating } = useIsGenerating();
  const fetchConversations = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/get-conversations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();

      if (data.conversation) {
        const formattedMessages = data.conversation.messages.map(
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
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const handleSendMessage = async (message: string, id: number) => {
    const userMessage: ExtendedMessage = {
      type: "client",
      prompt: {
        response: { candidates: [{ content: { parts: [{ text: message }] } }] },
      },
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setisGenerating(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (isChoosed && activeId >= -1) {
      fetchConversations(activeId);
      setIsChoosed(false);
    }
  }, [isChoosed, activeId]);

  useEffect(() => {
    if (isRemoved) {
      setMessages([]);
      setIsRemoved(false);
    }
  }, [isRemoved]);

  return (
    <div className={style.chat}>
      <div className={style["chat-container"]}>
        <MessagesContainer messages={messages} />
        <MessageInput
          onSendMessage={(message) => handleSendMessage(message, activeId)}
        />
      </div>
    </div>
  );
}
