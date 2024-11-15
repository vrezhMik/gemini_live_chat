import "./styles/main.scss";

import ChatContainer from "./components/ChatContainer/chatContainer.component";
import ChatHistory from "./components/ChatHistory/chatHistory.component";
import MobileHeader from "./components/MobileHeader/mobileHeader.component";
export default function App() {
  return (
    <div className="App">
      <MobileHeader />
      <div className={`main-container flex`}>
        <ChatHistory />
        <ChatContainer />
      </div>
    </div>
  );
}
