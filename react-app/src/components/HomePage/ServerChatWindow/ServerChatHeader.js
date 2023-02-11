import { useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
const ServerChatHeader = () => {
  const { pathname } = useLocation();
  const channel_id = parseInt(pathname.split("/")[3]);
  const url = pathname.split("/")[2];
  const urlChannels = pathname.split("/")[3];

  const channels = useSelector((state) => state.channels);

  return (
    <>
      <div className="server-chat-header-container">
        <div className="server-chat-header">
          {url !== "@me" && urlChannels !== "noChannels" && (
            <i id="server-chat-header-hash" className="fa-solid fa-hashtag"></i>
          )}
          <p>{channels[channel_id]?.name}</p>
          {channels[channel_id]?.description && (
            <>
              <p>-</p>
              <p id="channel-description">
                {channels[channel_id]?.description}
              </p>
            </>
          )}
        </div>
        <div id="chat-header-logo">
        <NavLink to="/" exact={true} activeClassName="active">
          <img id="logo-chat" alt="logo" src="https://res.cloudinary.com/dmtap2h65/image/upload/v1655674014/DISCHORD-cropped_aekkb4.png"/>
        </NavLink>
        </div>
      </div>
    </>
  );
};

export default ServerChatHeader;
