import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import { useLocation } from "react-router-dom";
import CreateChannelForm from "./CreateChannelForm";
import EditChannelForm from "./EditChannelForm";
import ChannelListDiv from "./ChannelListDiv";

const ChannelList = () => {
  const [showDropdown, setShowDropdown] = useState(true);
  const { pathname } = useLocation();
  const channels = useSelector((state) => Object.values(state.channels));
  const user = useSelector((state) => state.session.user);
  const [showChannelForm, setShowChannelForm] = useState(false);
  const servers = useSelector((state) => Object.values(state.servers));
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditForm, setShowEditForm] = useState();
  const currentServer = servers.find(
    (server) => server.id === parseInt(pathname.split("/")[2])
  );

  const serverChannelsFiltered = channels.filter(
    (channel) => channel.server_id === parseInt(pathname.split("/")[2])
  );

  const [selectedChannel, setSelectedChannel] = useState(
    serverChannelsFiltered[0]
  );

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCreateChannel = () => {
    setShowChannelForm(true);
  };

  const handleEditChannel = () => {
    setShowEditForm(true);
  };

  useEffect(() => {
    if (channels) {
      setIsLoaded(true);
    }
  }, [channels]);

  useEffect(() => {
    if (!showDropdown) return;

    const closeMenu = () => {
      setShowDropdown(false);
    };
  }, [showDropdown]);

  // Invite users section

  return (
    <>
      {isLoaded && (
        <div>
          <div className="channel-text-channel-div">
            <div className="channel-list-text-channel">
              <>
                <i className="fa-solid fa-angle-right fa-sm"></i>
              </>

              <p>Text Channels</p>
            </div>
            {user.id === currentServer?.owner_id && (
              <button id="channel-add" onClick={handleCreateChannel}>
                <i className="fa-solid fa-plus fa-lg"></i>
              </button>
            )}
          </div>

          <>
            {serverChannelsFiltered.map((channel) => {
              return (
                <ChannelListDiv
                  {...{ channel }}
                  {...{ setSelectedChannel }}
                  // {...{ currChannel }}
                  {...{ setShowEditForm }}
                  {...{ handleEditChannel }}
                  {...{ setShowDropdown }}
                  key={channel.id}
                />
              );
            })}
          </>

          {showChannelForm && (
            <Modal onClose={() => setShowChannelForm(false)}>
              <CreateChannelForm {...{ setShowChannelForm }} />
            </Modal>
          )}
          {showEditForm && (
            <Modal onClose={() => setShowEditForm(false)}>
              <EditChannelForm {...{ setShowEditForm }} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default ChannelList;

{
  /* <i class="fa-solid fa-hashtag"></i> */
}
