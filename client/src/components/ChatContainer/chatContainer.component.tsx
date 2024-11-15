import MessageInput from "../MessageInput/messageInput.component";
import MessagesContainer from "../MessagesContainer/messagesContainer.component";
import style from "./ChatContainer.module.scss";

export default function ChatContainer() {
  return (
    <div className={style.chat}>
      <div className={style["chat-container"]}>
        <MessagesContainer />
        <MessageInput />
      </div>
    </div>
  );
}
