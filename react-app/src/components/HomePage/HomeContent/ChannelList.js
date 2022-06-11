import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import CreateChannelForm from "./CreateChannelForm";
import ChannelListDiv from "./ChannelListDiv";

const ChannelList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const channels = useSelector((state) => Object.values(state.channels));
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCreateChannel = async () => {
    setShowChannelForm(true);
  };

  useEffect(() => {
    if (!showDropdown) return;

    const closeMenu = () => {
      setShowDropdown(false);
    };
  }, [showDropdown]);

  return (
    <>
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
            <p>general</p>
          </button>
          <button id="channel-settings">
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
        {showDropdown && (
          <>
            {channels.map((channel) => {
              return <ChannelListDiv {...{ isShown }} {...{setIsShown}} {...{ channel }} />;
            })}
          </>
        )}
      </div>
      {showChannelForm && (
        <Modal onClose={() => setShowChannelForm(false)}>
          <CreateChannelForm {...{ setShowChannelForm }} />
        </Modal>
      )}
    </>
  );
};

export default ChannelList;

{
  /* <i class="fa-solid fa-hashtag"></i> */
}
