import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import ChatContainer from "./components/Chat/ChatContainer";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { currentUserAtom } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auth.repository";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div />;

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
