import {useState} from "react"


const ChannelListDiv = ({channel, isShown, setIsShown}) => {

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      key={channel.id}
      className="channel-general-container"
    >
      <button className="channel-general-button">
        <i className="fa-solid fa-hashtag"></i>
        <p>{channel.name}</p>
      </button>

      <button id="channel-settings">
        {isShown && <i className="fa-solid fa-gear"></i>}
      </button>
    </div>
  );
};

export default ChannelListDiv
