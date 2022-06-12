import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const ServerList = () => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const servers = useSelector((state) => Object.values(state.servers));
  const channels = useSelector((state) => Object.values(state.channels));



  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (servers && channels) {
      setIsLoaded(true);
    }
  }, [servers, channels]);


  // console.log(channels, "============NAW");
  const handleClick = (server) => {
    // console.log(server.channel_ids)
    const serverChannels = channels.filter(channel=> server.channel_ids.includes(channel.id))

    if (isLoaded && channels) {
      // if (localStorage.getItem(`${server.id}`)) {
      //   // console.log('========== LOCAL')
      //   history.push(
      //     `/channels/${server.id}/${localStorage.getItem(`${server.id}`)}`
      //     );
      //   } else {
          // console.log(channels, '===================')
          history.push(`/channels/${server.id}/${serverChannels[0]?.id}`);
      // }
    }
  };

  return (
    <div>
      {isLoaded &&
        servers.map((server) => {
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
