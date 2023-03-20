import Chat from "../Chat/Chat";
import ServerChatHeader from "./ServerChatHeader";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loadAllRequests, loadAllFriends } from "../../../store/friend";

const ServerChatWindow = ({
  setLoadingMessages,
  loadingMessages,
  setOnlineMembers,
  onlineMembers,
  socket,
  setLoading,
  setSelected,
  selected,
}) => {
  // state for friends nav bar selection
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    await dispatch(loadAllRequests(sessionUser.id));
    await dispatch(loadAllFriends(sessionUser.id));
    await setLoaded(true);
  }, [selected]);

  return (
    <div className="server-chat-container">
      <ServerChatHeader {...{ selected }} {...{ setSelected }} />
      <Chat
        {...{ loaded }}
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
