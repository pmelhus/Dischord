import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Modal } from "../../../context/Modal";
import { useLocation} from "react-router-dom"
import CreateChannelForm from "./CreateChannelForm";
import EditChannelForm from "./EditChannelForm"
import ChannelListDiv from "./ChannelListDiv";

const ChannelList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {pathname} = useLocation()
  const channels = useSelector((state) => Object.values(state.channels));
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditForm, setShowEditForm] = useState()
  const [isLoadedRefresh, setIsLoadedRefresh] = useState(false)
  const dispatch = useDispatch()
  const currChannel = channels.find(channel=> channel.id === parseInt(pathname.split('/')[3]))


  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCreateChannel = () => {
    setShowChannelForm(true);
  };

  const handleEditChannel = () => {
    setShowEditForm(true)
  };

  useEffect(() => {
    if (channels) {
      setSelectedChannel(selectedChannel)
      setIsLoaded(true);
    }
  }, [channels, selectedChannel, dispatch, showEditForm]);


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
          <div className="channel-general-container">
            <button className="channel-general-button">
              <i className="fa-solid fa-hashtag"></i>
              <p>{currChannel?.name}</p>
            </button>
            <button onClick={handleEditChannel} className="channel-settings">
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
          {showDropdown && channels.length > 1 && (
            <>
              {channels.map((channel) => {
                if (channel.id === currChannel?.id) return

                return (
                  <ChannelListDiv
                    {...{ channel }}
                    {...{currChannel}}
                    {...{handleEditChannel}}
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
              <EditChannelForm {...{setShowEditForm}} />
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
