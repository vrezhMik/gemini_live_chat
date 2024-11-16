import ClientMessage from "../ClientMessage/clientMessage.component";
import ServerMessage from "../ServerMessage/serverMessage.component";
import styles from "./MessagesContainer.module.scss";
import { Message } from "../../utils/types";

type MessageContainerProps = {
  messages: Message[];
};
export default function MessagesContainer({ messages }: MessageContainerProps) {
  return (
    <div className={styles.messages}>
      {messages.map((message, index) => {
        if (message.type == "client")
          return <ClientMessage text={message.prompt} key={index} />;
        return <ServerMessage key={index} reply={message.prompt} />;
      })}
    </div>
  );
}
