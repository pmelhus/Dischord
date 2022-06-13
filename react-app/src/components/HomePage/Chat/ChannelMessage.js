import { createChannelMessage } from "../../../store/channelMessage";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ChannelMessage = ({ isSent, user, message, setIsSent }) => {
  // useEffect(() => {
  //   if (isSent) {

  //       dispatch(createChannelMessage(message));
  //       setIsSent(false);
  //   }
  // }, [message]);

  return (
    <>
      {user.image_url ? (
        <img
          className="channel-chat-profile-image"
          alt="profile"
          src={user.image_url}
        />
      ) : (
        <div className="channel-chat-profile-image">
          <i className="fa-solid fa-user-music"></i>
        </div>
      )}
      <div className="channel-chat-user-msg">
        <h4>{user.username}</h4>
        <p>{`${message.content}`}</p>
      </div>
    </>
  );
};

export default ChannelMessage;
