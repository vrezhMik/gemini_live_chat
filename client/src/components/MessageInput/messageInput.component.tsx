import { useRef, useState } from "react";
import styles from "./MessageInput.module.scss";
import { useActiveId } from "../../store/store";
import createNewChat from "../../controlls/db";

type MessageInputProps = {
  onSendMessage: (message: string, id: number) => void;
};

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { activeId, setActiveId } = useActiveId();

  const handleInputChange = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      const isEmpty = textarea.value.trim().length === 0;
      setIsButtonActive(!isEmpty);
      textarea.style.height = "auto"; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    const textarea = textAreaRef.current;
    if (!textarea || textarea.value.trim().length === 0) return;

    let chatId = activeId;
    if (activeId === -1) {
      const newChat = await createNewChat();
      chatId = newChat._id;
      setActiveId(chatId);
    }

    const message = textarea.value.trim();
    textarea.value = ""; // Clear textarea
    setIsButtonActive(false); // Disable button after clearing
    onSendMessage(message, chatId);
  };

  return (
    <div className={styles["message-input"]}>
      <textarea
        ref={textAreaRef}
        onInput={handleInputChange}
        className={styles["message-input-textarea"]}
        placeholder="Message GeminiAI"
      />
      <button
        className={`${styles["message-input-send"]} ${
          isButtonActive ? styles["message-input-active"] : ""
        }`}
        ref={sendButtonRef}
        onClick={handleSendMessage}
        disabled={!isButtonActive}
      >
        <SendIcon />
      </button>
    </div>
  );
}

// SendIcon Component
function SendIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-2xl"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
        fill="#2e2e2e"
      />
    </svg>
  );
}
