import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
import { useLocation } from "react-router-dom";
import CreateChannelForm from "./CreateChannelForm";
import EditChannelForm from "./EditChannelForm";
import ChannelListDiv from "./ChannelListDiv";

const ChannelList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const channels = useSelector((state) => Object.values(state.channels));

  const [showChannelForm, setShowChannelForm] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditForm, setShowEditForm] = useState();
  const [localStorageChannel, setLocalStorageChannel] = useState(
    localStorage.getItem(
      `${parseInt(pathname.split("/")[2])}`,
      `${parseInt(pathname.split("/")[3])}`
    )
  );

  const dispatch = useDispatch();
  const serverChannels = channels.filter(
    (channel) => channel.server_id === parseInt(pathname.split("/")[2])
  );

  const selectedChannel = serverChannels.find(
    (channel) => channel.id === parseInt(localStorageChannel)
  );
  // console.log(parseInt(localStorageChannel))

  const handleFirstChannel = () => {
    localStorage.setItem(
      `${parseInt(pathname.split("/")[2])}`,
      `${parseInt(pathname.split("/")[3])}`
    );
    setLocalStorageChannel(
      localStorage.getItem(
        `${parseInt(pathname.split("/")[2])}`,
        `${parseInt(pathname.split("/")[3])}`
      )
    );
  };

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

  return (
    <>
      {isLoaded && (
        <div>
          <div className="channel-text-channel-div">
            <button id="channel-dropdown-button" onClick={handleClick}>
              <div className="channel-list-text-channel">
                {showDropdown ? (
                  <>
                    <i className="fa-solid fa-angle-down fa-sm"></i>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-angle-right fa-sm"></i>
                  </>
                )}
                <p>Text Channels</p>
              </div>
            </button>
            <button id="channel-add" onClick={handleCreateChannel}>
              <i className="fa-solid fa-plus fa-lg"></i>
            </button>
          </div>

          {serverChannels.length === 1 && (
            <div className="channel-general-container">
              <button
                onClick={handleFirstChannel}
                className="channel-general-button"
              >
                <i className="fa-solid fa-hashtag"></i>
                <p>{serverChannels[0]?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )}

          {!showDropdown && serverChannels.length > 1 && !selectedChannel && (
            <div className="channel-general-container">
              <button className="channel-general-button">
                <i className="fa-solid fa-hashtag"></i>
                <p>{serverChannels[0]?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )}

          {!showDropdown && serverChannels.length > 1 && selectedChannel && (
            <div className="channel-general-container">
              <button className="channel-general-button">
                <i className="fa-solid fa-hashtag"></i>
                <p>{selectedChannel?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )}

          {showDropdown && serverChannels.length > 1 && selectedChannel && (
            <div className="channel-general-container">
              <button className="channel-general-button">
                <i className="fa-solid fa-hashtag"></i>
                <p>{selectedChannel?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )}

          {showDropdown && serverChannels.length > 1 && (
            <>
              {serverChannels.map((channel) => {
                if (selectedChannel?.id === channel.id) return
                return (
                  <ChannelListDiv
                    {...{ channel }}
                    {...{ setLocalStorageChannel }}
                    // {...{ currChannel }}
                    {...{setShowEditForm}}
                    {...{ handleEditChannel }}
                    {...{ setShowDropdown}}
                    key={channel.id}
                  />
                );
              })}
            </>
          )}

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
