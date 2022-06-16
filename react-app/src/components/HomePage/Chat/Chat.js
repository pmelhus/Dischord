// import the socket
import { io } from "socket.io-client";
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

// outside of your component, initialize the socket variable
let socket;

const Chat = ({ setLoading }) => {
  const [messages, setMessages] = useState([]);
  // use state for controlled form input
  const [chatInput, setChatInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { pathname } = useLocation();
  const channelId = parseInt(pathname.split("/")[3]);
  const serverId = parseInt(pathname.split("/")[2]);
  const [isSent, setIsSent] = useState(false);
  const currentChannel = useSelector((state) => state.channels[channelId]);
  const allChannelMessages = useSelector((state) =>
    Object.values(state.channelMessages)
  );
  const allServers = useSelector((state) => Object.values(state.servers));
  const [onlineMembers, setOnlineMembers] = useState();

  const currentChannelMessages = allChannelMessages.filter(
    (message) => message.channel_id === channelId
  );

  // const serverMembersArray =
  //  setLoading(true)

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events

    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      // setMessages((messages) => [...messages, chat]);
      dispatch(genChannelMessages());
    });

    socket.on("login", (login) => {
      setOnlineMembers((onlineMembers) => [...onlineMembers, login]);
    });

    socket.on("logout", (logout) => {
      setOnlineMembers((onlineMembers) =>
        [...onlineMembers].filter((member) => member.id !== logout.id)
      );
    });

    // socket.on('deletedMessage', (deletedMessage) => {
    //   dispatch(genChannelMessages(channelId));
    // })

    // socket.on('editedMessage', (editedMessage) => {
    //   dispatch(genChannelMessages(channelId));
    // })
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

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

    await socket.emit("chat");

    await setIsSent(true);

    // clear the input field after the message is sent
    await setChatInput("");
  };

  useEffect(() => {
    genChannelMessages();
  }, [pathname]);

  return (
    <div className="chat-container">
      <div className="channel-chat-container">
        <div className="channel-chat-and-send-form">
          <div className="channel-chat-messages">
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
        <div className="server-members-header"></div>
        <div className="server-members-list">
          <div className="server-members-online">
            <h4>ONLINE</h4>
            {onlineMembers &&onlineMembers?.map((member) => {
              return (
                <>
                  <h3>{member.username}</h3>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
