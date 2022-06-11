import { useState } from "react";
import {useHistory} from "react-router-dom"

const ChannelListDiv = ({ channel, handleEditChannel, currChannel }) => {

  const history = useHistory()

const handleSelectChannel = () => {

  history.push(`/channels/${channel.server_id}/${channel?.id}`)
}

  return (
    <div
      key={channel.id}
      className="channel-general-container"
    >
      <button onClick={handleSelectChannel} className="channel-general-button">
        <i className="fa-solid fa-hashtag"></i>
        <p>{channel.name}</p>
      </button>

      <button className="channel-settings">
        {<i className="fa-solid fa-gear"></i>}
      </button>
    </div>
  );
};

export default ChannelListDiv;
