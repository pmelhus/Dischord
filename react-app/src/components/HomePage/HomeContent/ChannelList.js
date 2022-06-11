import { useState, useEffect } from "react";

const ChannelList = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
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
          <button id="channel-add">
            <i className="fa-solid fa-plus fa-lg"></i>
          </button>
        </div>
        <div className="channel-general-container">
          <button className="channel-general-button">
            <i class="fa-solid fa-hashtag"></i>
            <p>general</p>
          </button>
        </div>
        {showDropdown && (

          <>
          
          </>
        )}
      </div>
    </>
  );
};

export default ChannelList;

{
  /* <i class="fa-solid fa-hashtag"></i> */
}
