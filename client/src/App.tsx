// Import styles
import "./styles/main.scss";

// Import components
import ChatContainer from "./components/ChatContainer/chatContainer.component";
import ChatHistory from "./components/ChatHistory/chatHistory.component";
import MobileHeader from "./components/MobileHeader/mobileHeader.component";

export default function App() {
  return (
    <div className="app">
      <MobileHeader />
      <main className="main-container flex">
        <ChatHistory />
        <ChatContainer />
      </main>
    </div>
  );
}
