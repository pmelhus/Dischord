import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EditChannelForm2 from "./EditChannelForm2"
import {Modal} from "../../../context/Modal"

const ChannelListDiv = ({
  setShowDropdown,
  channel,
  setLocalStorageChannel
}) => {
  const history = useHistory();

  const [showEditForm2, setShowEditForm2] = useState(false)

  const handleSelectChannel = () => {
    localStorage.setItem(`${channel.server_id}`, `${channel.id}`);
    setLocalStorageChannel(
      localStorage.getItem(`${channel.server_id}`, `${channel.id}`)
    );
    setShowDropdown(false);
    history.push(`/channels/${channel.server_id}/${channel.id}`);
  };

  const handleEditChannel = () => {
    setShowEditForm2(true)
  }

  useEffect(() => {
    setLocalStorageChannel(
      localStorage.getItem(`${channel.server_id}`, `${channel.id}`)
    );
  }, []);

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

        <button onClick={handleEditChannel} className="channel-settings">
          {<i className="fa-solid fa-gear"></i>}
        </button>
      </div>
      {showEditForm2 && (
            <Modal onClose={() => setShowEditForm2(false)}>
              <EditChannelForm2 {...{ setShowEditForm2 }} {...{channel}} />
            </Modal>
          )}
    </>
  );
};

export default ChannelListDiv;
