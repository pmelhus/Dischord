import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ServerList = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const servers = useSelector((state) => Object.values(state.servers));
  // const channels = useSelector((state) => Object.values(state.channels));
  const sessionUser = useSelector((state) => state.session.user);
  const serverId = parseInt(pathname.split("/")[2]);

  // function that keys into member ids array of objects and returns an array of member ids
  const memberIdsToArr = (server) => {
    const arr = [];
    server.members_ids.forEach((member) => {
      arr.push(member.user_id);
    });
    return arr;
  };

  const myServers = servers.filter(
    (server) =>
      server.owner_id === sessionUser.id ||
      memberIdsToArr(server).includes(sessionUser.id)
  );

  // console.log(myServers)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (servers) {
      setIsLoaded(true);
    }
  }, [servers]);

  const handleClick = (server) => {
    if (isLoaded && server.channel_ids.length) {
      history.push(`/channels/${server?.id}/${server?.channel_ids[0]}`);

      // }
    } else {
      history.push(`/channels/${server?.id}/noChannels`);
    }
  };

  return (
    <div>
      {isLoaded &&
        myServers.map((server) => {
          return (
            <div key={server.id} className={"server-list-div"}>
              <button
                className="server-image-icon-button"
                onClick={() => handleClick(server)}
              >
                {server?.image_url ? (
                  <img
                    alt="Server profile icon"
                    className={
                      server.id === serverId
                        ? "server-image-icon-selected"
                        : "server-image-icon"
                    }
                    src={server?.image_url}
                  ></img>
                ) : (
                  <h2
                    className={
                      server.id === serverId
                        ? "server-image-icon-selected"
                        : "server-image-icon"
                    }
                  >
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
