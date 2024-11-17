import ClientMessage from "../ClientMessage/clientMessage.component";
import ServerMessage from "../ServerMessage/serverMessage.component";
import styles from "./MessagesContainer.module.scss";
import { Message, Prompt } from "../../utils/types";

type TMessage = {
  prompt: Prompt;
};
type MessageContainerProps = {
  messages: Array<Message & { prompt: Prompt; type: string }>;
};

let text: TMessage;
export default function MessagesContainer({ messages }: MessageContainerProps) {
  return (
    <div className={styles.messages}>
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
