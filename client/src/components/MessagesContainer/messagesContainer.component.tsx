import ClientMessage from "../ClientMessage/clientMessage.component";
import ServerMessage from "../ServerMessage/serverMessage.component";
import styles from "./MessagesContainer.module.scss";

export default function MessagesContainer() {
  return (
    <div className={styles.messages}>
      {/* <ClientMessage /> */}
      {/* <ServerMessage /> */}
    </div>
  );
}
