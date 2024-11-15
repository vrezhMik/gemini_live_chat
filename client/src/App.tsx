import "./styles/main.scss";

import ChatContainer from "./components/ChatContainer/chatContainer.component";
import ChatHistory from "./components/ChatHistory/chatHistory.component";
export default function App() {
  return (
    <div className="App">
      <div className={`main-container flex`}>
        <ChatHistory />
        <ChatContainer />
      </div>
    </div>
  );
}
