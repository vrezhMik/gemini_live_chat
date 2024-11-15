import "./styles/main.scss";

import ChatContainer from "./components/ChatContainerComponent/chatContainer.component";
import ChatHistory from "./components/ChatHistoryComponent/chatHistory.component";
export default function App() {
  return (
    <div className="App">
      <div className={`chat flex`}>
        <ChatHistory />
        <ChatContainer />
      </div>
    </div>
  );
}
