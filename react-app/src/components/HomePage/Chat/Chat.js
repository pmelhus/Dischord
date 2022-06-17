// import the socket

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  createChannelMessage,
  genChannelMessages,
} from "../../../store/channelMessage";
import ChannelMessage from "./ChannelMessage";
import LoadingScreen from "../../LoadingScreen";
import { LoadingModal } from "../../../context/LoadingModal";
import UserOnlineCard from "./UserOnlineCard";
import UserOfflineCard from "./UserOfflineCard";

import MePage from './MePage/MePage'
// outside of your component, initialize the socket variable

const Chat = ({ socket, setLoading }) => {
  const [messages, setMessages] = useState([]);
  // use state for controlled form input
  const [chatInput, setChatInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { pathname } = useLocation();
  const url = pathname.split("/")[2];
  const channelId = parseInt(pathname.split("/")[3]);
  const serverId = parseInt(pathname.split("/")[2]);
  const [isSent, setIsSent] = useState(false);
  const currentChannel = useSelector((state) => state.channels[channelId]);
  const allChannelMessages = useSelector((state) =>
    Object.values(state.channelMessages)
  );
  const allServers = useSelector((state) => Object.values(state.servers));
  const users = useSelector((state) => Object.values(state.users));
  const currentServerMemberIds = useSelector(
    (state) => state.servers[serverId]
  )?.members_ids;
  const currentChannelMessages = allChannelMessages.filter(
    (message) => message.channel_id === channelId
  );
 

  const currentServer = useSelector((state) => state.servers[serverId]);
  // console.log(currentServerMemberIds.members_ids, 'hello')

  // console.log(onlineMembers, 'ONLINE MEMBERS')

  // const serverMembersArray =
  //  setLoading(true)

  // const imageUrl = URL.createObjectURL(homeImage)


  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    // emit a message

    await dispatch(
      createChannelMessage({
        user_id: user.id,
        msg: chatInput,
        channel_id: channelId,
      })
    );

    await socket?.emit("chat");

    await setIsSent(true);

    // clear the input field after the message is sent
    await setChatInput("");
  };

  useEffect(() => {
    genChannelMessages();
  }, [pathname]);

  let online = [];
  let offline = [];

  users.map((user) => {
    if (currentServerMemberIds?.includes(user.id)) {
      if (user.online) {
        online.push(user);
      } else {
        offline.push(user);
      }
    }
  });

  useEffect(() => {});

  return (
    <div className="chat-container">
      <div className="channel-chat-container">
        <div className="channel-chat-and-send-form">
          <div className="channel-chat-messages">
            {pathname.split("/")[2] === "@me" && (
              <MePage/>
            )}

            {pathname.split("/")[2] !== "@me" &&
              currentChannelMessages.reverse().map((message, ind) => (
                <div className="channel-message-div" key={ind}>
                  <ChannelMessage
                    {...{ channelId }}
                    {...{ socket }}
                    {...{ message }}
                  />
                </div>
              ))}
          </div>
          <form className="channel-chat-form" onSubmit={sendChat}>
            <input
              id="channel-chat-input"
              value={chatInput}
              placeholder={`Message ${currentChannel?.name}`}
              onChange={updateChatInput}
            />
            {/* <button type="submit">Send</button> */}
          </form>
        </div>
      </div>
      <div className="server-members">
        <div className="server-members-list">
          <div className="server-members-online">
            {url !== "@me" && (
              <p className="server-members-titles">Online - {online.length}</p>
            )}
            {users &&
              users.map((user) => {
                if (currentServerMemberIds?.includes(user.id)) {
                  return (
                    <>
                      {user.online && (
                        <>
                          <UserOnlineCard
                            {...{ online }}
                            {...{ currentServer }}
                            {...{ currentServerMemberIds }}
                            {...{ user }}
                          />
                        </>
                      )}
                    </>
                  );
                }
              })}
            {url !== "@me" && (
              <p className="server-members-titles">
                Offline - {offline.length}
              </p>
            )}
            {users &&
              users.map((user) => {
                if (currentServerMemberIds?.includes(user.id)) {
                  return (
                    <>
                      {!user.online && (
                        <>
                          <UserOfflineCard
                            {...{ currentServer }}
                            {...{ currentServerMemberIds }}
                            {...{ user }}
                          />
                        </>
                      )}
                    </>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
