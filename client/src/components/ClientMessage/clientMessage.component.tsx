import styles from "./ClientMessage.module.scss";

type UserMessage = {
  text: string;
};
export default function ClientMessage({ text }: UserMessage) {
  return (
    <div className={styles["client-message-container"]}>
      <p className={styles["client-message"]}>{text}</p>
    </div>
  );
}
