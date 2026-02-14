import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import ChatContainer from "./components/Chat/ChatContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Chat />}>
          <Route
            index
            element={
              <div className="chat-empty">
                会話を選択、または作成してください
              </div>
            }
          />
          <Route path="/chats/:conversationId" element={<ChatContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
