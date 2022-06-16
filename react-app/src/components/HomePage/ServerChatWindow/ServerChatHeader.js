import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const ServerChatHeader = () => {
  const { pathname } = useLocation();
  const channel_id = parseInt(pathname.split("/")[3]);
  const url = pathname.split('/')[2]
  console.log(url)
  const channels = useSelector((state) => state.channels);

  return (
    <>
      <div className="server-chat-header">
        { url !== '@me' && (

        <i id="server-chat-header-hash" className="fa-solid fa-hashtag"></i>
        )}
        <p>{channels[channel_id]?.name}</p>
        {channels[channel_id]?.description && (
          <>
            <p>-</p>
            <p id="channel-description">{channels[channel_id]?.description}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ServerChatHeader;
