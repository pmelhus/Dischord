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

  const [showChannelForm, setShowChannelForm] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditForm, setShowEditForm] = useState();
  const [localStorageChannel, setLocalStorageChannel] = useState(
    localStorage.getItem(
      `${parseInt(pathname.split("/")[2])}`

    )
  );
  const serverChannelsFiltered = channels.filter(
    (channel) => channel.server_id === parseInt(pathname.split("/")[2])
  );


  const selectedChannelLocal = serverChannelsFiltered.find(
    (channel) => channel.id === parseInt(localStorageChannel)
  );
  const [selectedChannel, setSelectedChannel] = useState(
    serverChannelsFiltered[0]
  );

  useEffect(() => {
    if (selectedChannelLocal) {
      setSelectedChannel(selectedChannelLocal)
    } else {
      setSelectedChannel(selectedChannel)
    }
  }, [selectedChannelLocal, serverChannelsFiltered, selectedChannel, pathname]);


  console.log(serverChannelsFiltered, "SERVER CHANNELS");
  if (selectedChannelLocal) {
    console.log(selectedChannelLocal, "SELECTED LOCAL CHANNEL");
  }

  const handleFirstChannel = () => {
    localStorage.setItem(
      `${parseInt(pathname.split("/")[2])}`,
      `${parseInt(pathname.split("/")[2])}:${parseInt(pathname.split("/")[3])}  `
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

            <button id="channel-add" onClick={handleCreateChannel}>
              <i className="fa-solid fa-plus fa-lg"></i>
            </button>
          </div>
{/*
          <div className="channel-general-container">
            <button
              onClick={handleFirstChannel}
              className="channel-general-button"
            >
              <i className="fa-solid fa-hashtag"></i>
              <p>{serverChannelsFiltered[0]?.name}</p>
            </button>
            <button onClick={handleEditChannel} className="channel-settings">
              <i className="fa-solid fa-gear"></i>
            </button>
          </div> */}

          {/* {!showDropdown && serverChannelsFiltered.length > 1 && !selectedChannelLocal && (
            <div className="channel-general-container">
              <button className="channel-general-button">
                <i className="fa-solid fa-hashtag"></i>
                <p>{serverChannelsFiltered[0]?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )}

          {!showDropdown && serverChannelsFiltered.length > 1 && selectedChannelLocal && (
            <div className="channel-general-container">
              <button className="channel-general-button">
                <i className="fa-solid fa-hashtag"></i>
                <p>{selectedChannelLocal?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )}

          {showDropdown && serverChannelsFiltered.length > 1 && selectedChannelLocal && (
            <div className="channel-general-container">
              <button className="channel-general-button">
                <i className="fa-solid fa-hashtag"></i>
                <p>{selectedChannelLocal?.name}</p>
              </button>
              <button onClick={handleEditChannel} className="channel-settings">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          )} */}


            <>
              {serverChannelsFiltered.map((channel) => {

                return (
                  <ChannelListDiv
                    {...{ channel }}
                    {...{ setLocalStorageChannel }}
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
