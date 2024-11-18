import { useEffect, useRef } from "react";
import styles from "./MessagesContainer.module.scss";

import ClientMessage from "../ClientMessage/clientMessage.component";
import ServerMessage from "../ServerMessage/serverMessage.component";
import { Message, Prompt } from "../../utils/types";

type MessageContainerProps = {
  messages: Array<Message & { prompt: Prompt; type: string }>;
};

export default function MessagesContainer({ messages }: MessageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.messages} ref={containerRef}>
      {messages.map((message, index) => {
        if (message.type === "client") {
          const clientText =
            typeof message.prompt === "string"
              ? message.prompt
              : message.prompt?.response?.candidates[0]?.content.parts[0]
                  ?.text || "";
          return <ClientMessage text={clientText} key={index} />;
        }

        const serverText =
          message.prompt?.response?.candidates[0]?.content.parts[0]?.text || "";
        return <ServerMessage key={index} reply={serverText} />;
      })}
    </div>
  );
}
