import Chat from "../Chat/Chat";
import ServerChatHeader from "./ServerChatHeader";
import { useSelector } from "react-redux";
import { useState } from "react";

const ServerChatWindow = ({
  setLoadingMessages,
  loadingMessages,
  setOnlineMembers,
  onlineMembers,
  socket,
  setLoading,
}) => {
  
  // state for friends nav bar selection
  const [selected, setSelected] = useState("addFriend");

  return (
    <div className="server-chat-container">
      <ServerChatHeader {...{ selected }} {...{ setSelected }} />
      <Chat
        {...{ selected }}
        {...{ setSelected }}
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
