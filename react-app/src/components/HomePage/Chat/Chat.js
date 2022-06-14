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
  const [isSent, setIsSent] = useState(false);
  const currentChannel = useSelector((state) => state.channels[channelId]);
  const allChannelMessages = useSelector((state) =>
    Object.values(state.channelMessages)
  );
  //  setLoading(true)

  useEffect(async () => {
    // create websocket/connect
    socket = io();

    // listen for chat events

    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state

      // setMessages((messages) => [...messages, chat]);
console.log(    dispatch(genChannelMessages(channelId)))
      dispatch(genChannelMessages(channelId));
    });

    setLoading(false);
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message

    socket.emit("chat", {
      user_id: user.id,
      msg: chatInput,
      channel_id: channelId,
    });

    dispatch(
      createChannelMessage({
        user_id: user.id,
        msg: chatInput,
        channel_id: channelId,
      })
    );

    setIsSent(true);

    // clear the input field after the message is sent
    setChatInput("");
    // genChannelMessages(channelId)
  };


  //  setLoading(false)
  // additional code to be added

  // console.log(messages);

  useEffect(() => {
    genChannelMessages(channelId);
  }, []);



  return (
    <div className="channel-chat-container">
      <div className="channel-chat-messages">
        {pathname.split("/")[2] !== "@me" &&
          allChannelMessages.reverse().map((message, ind) => (
            <div className="channel-message-div" key={ind}>
              <ChannelMessage {...{ message }} />
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
  );
};

export default Chat;
