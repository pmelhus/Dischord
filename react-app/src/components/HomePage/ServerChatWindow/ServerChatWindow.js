import Chat from "../Chat/Chat";
import ServerChatHeader from "./ServerChatHeader";
import { useSelector } from "react-redux";

const ServerChatWindow = ({
  setLoadingMessages,
  loadingMessages,
  setOnlineMembers,
  onlineMembers,
  socket,
  setLoading,
}) => {
  return (
    <div className="server-chat-container">
      <ServerChatHeader />
      <Chat
        {...{ setLoadingMessages }}
        {...{ loadingMessages }}
        {...{ onlineMembers }}
        {...{ setOnlineMembers }}
        {...{ socket }}
        {...{ setLoading }}
      />
    </div>
  );
};

export default ServerChatWindow;
