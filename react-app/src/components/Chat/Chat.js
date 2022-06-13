// import the socket
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// outside of your component, initialize the socket variable
let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);

  // use state for controlled form input
  const [chatInput, setChatInput] = useState("");

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });

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
    socket.emit("chat", { user: user.username, msg: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  // additional code to be added

  return (
    user && (
      <div className="channel-chat-container">
        <div className="channel-chat-messages">
          {messages.map((message, ind) => (
            <div className="channel-message-div" key={ind}>
              {user.image_url ? (
                <img
                  className="channel-chat-profile-image"
                  alt="profile"
                  src={user.image_url}
                />
              ) : (
                <div className='channel-chat-profile-image'>
                  <i className="fa-solid fa-user-music"></i>
                </div>
              )}
              <div className="channel-chat-user-msg">
                <h4>{user.username}</h4>
                <p>{`${message.msg}`}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="channel-chat-form" onSubmit={sendChat}>
          <input
            id="channel-chat-input"
            value={chatInput}
            onChange={updateChatInput}
          />
          {/* <button type="submit">Send</button> */}
        </form>
      </div>
    )
  );
};

export default Chat;
