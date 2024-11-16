import styles from "./HistoryComponent.module.scss";
type chatProps = {
  chat: {
    _id: number;
    name: string;
  };
};
export default function HistoryComponent({ chat }: chatProps) {
  return (
    <div className={styles["history-element"]}>
      <a href="">{chat.name}</a>
    </div>
  );
}
