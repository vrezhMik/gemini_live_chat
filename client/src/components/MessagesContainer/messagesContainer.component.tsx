import ClientMessage from "../ClientMessage/clientMessage.component";
import styles from "./MessagesContainer.module.scss";

export default function MessagesContainer() {
  return (
    <div className={styles.messages}>
      <ClientMessage />
    </div>
  );
}
