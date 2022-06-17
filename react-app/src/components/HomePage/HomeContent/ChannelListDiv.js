import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import EditChannelForm2 from "./EditChannelForm2";
import { Modal } from "../../../context/Modal";
import { useSelector } from "react-redux";

const ChannelListDiv = ({
  setShowDropdown,
  channel,
  setSelectedChannel,
}) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => Object.values(state.servers));
  const currentServer = servers.find(
    (server) => server.id === parseInt(pathname.split("/")[2])
  );
  const [showEditForm2, setShowEditForm2] = useState(false);

  const handleSelectChannel = () => {
    localStorage.setItem(
      `${channel.server_id}`,
      `${channel.server_id}:${channel.id}`
    );

    setShowDropdown(false);
    setSelectedChannel(channel);
    history.push(`/channels/${channel.server_id}/${channel.id}`);
  };

  const handleEditChannel = () => {
    setShowEditForm2(true);
  };


  return (
    <>
      <div key={channel.id} className="channel-general-container">
        <button
          onClick={handleSelectChannel}
          className="channel-general-button"
        >
          <i className="fa-solid fa-hashtag"></i>
          <p>{channel.name}</p>
        </button>
        {user.id === currentServer.owner_id && (
          <button onClick={handleEditChannel} className="channel-settings">
            {<i className="fa-solid fa-gear"></i>}
          </button>
        )}
      </div>
      {showEditForm2 && (
        <Modal onClose={() => setShowEditForm2(false)}>
          <EditChannelForm2 {...{ setShowEditForm2 }} {...{ channel }} />
        </Modal>
      )}
    </>
  );
};

export default ChannelListDiv;
