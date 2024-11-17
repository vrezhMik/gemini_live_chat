import { useRef, useState } from "react";
import styles from "./HistoryComponent.module.scss";
import { setActiveId, clearActiveId } from "../../store/activeID";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
type chatProps = {
  chat: {
    _id: number;
    name: string;
  };
  onRemove: (id: number) => void;
};
//todo: add error handling
export default function HistoryComponent({ chat, onRemove }: chatProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(chat.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const activeId = useSelector((state: RootState) => state.activeId);
  const remvoeChat = async (id: number) => {
    await fetch("http://localhost:5002/remove-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    onRemove(id);
  };

  const saveName = async (id: number) => {
    const input = inputRef.current;
    if (!input) return;
    await fetch("http://localhost:5002/rename-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, name: input.value }),
    });
    setIsEditing(false);
  };

  const setActiveChat = (id: number) => {
    dispatch(setActiveId(id));
  };
  return (
    <div className={styles["history-element"]}>
      {isEditing ? (
        <input
          type="text"
          value={name}
          ref={inputRef}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <button
          className={styles["history-element-button"]}
          onClick={() => setActiveChat(chat._id)}
        >
          {chat.name}
        </button>
      )}

      <div className={styles["history-element-control"]}>
        {isEditing ? (
          <button onClick={() => saveName(chat._id)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 13V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16M4 8V6C4 4.89543 4.89543 4 6 4H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L19.4142 8.41421C19.7893 8.78929 20 9.29799 20 9.82843V12M15 20V15H9V20"
                stroke="#ececec"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <button className={"rename"} onClick={() => setIsEditing(true)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                fill="#ececec"
              ></path>
            </svg>
          </button>
        )}

        <button className={"remove"} onClick={() => remvoeChat(chat._id)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
              fill="#f93a37"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
