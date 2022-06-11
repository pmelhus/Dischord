import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ServerList = () => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const servers = useSelector((state) => Object.values(state.servers));
  const channels = useSelector((state) => Object.values(state.channels))



  const handleClick = (server) => {
    const serverChannels = channels?.filter(channel=> channel.server_id === server.id)
    console.log('=====', serverChannels)

    return history.push(`/channels/${server.id}/${serverChannels[0]?.id}`);
  };

  return (
    <div>
      {servers && channels && servers.map((server) => {
        return (
          <div key={server.id} className="server-list-div">
            <button
              className="server-image-icon-button"
              onClick={() => handleClick(server)}
            >
              {server?.image_url ? (
                <img
                  alt="Server profile icon"
                  className="server-image-icon"
                  src={server.image_url}
                ></img>
              ) : (
                <h2 className="server-image-icon">
                  {server?.name?.split("")[0]}
                </h2>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ServerList;
