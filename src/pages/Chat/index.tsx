import { useAtomValue } from "jotai";
import Sidebar from "../../components/Sidebar";
import "./index.css";
import { Navigate, Outlet } from "react-router-dom";
import { currentUserAtom } from "../../modules/auth/current-user.state";

export default function Chat() {
  const currentUser = useAtomValue(currentUserAtom);

  if (!currentUser) return <Navigate to="/signin" />;
  return (
    <div className="chat-layout">
      <Sidebar />
      <div className="chat-main">
        <Outlet />
      </div>
    </div>
  );
}
