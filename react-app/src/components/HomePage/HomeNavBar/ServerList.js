import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  editButton: {
    position: "relative",
    padding: "2px",

    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": { backgroundColor: theme.channelListGray },
    cursor: "pointer",
  },
  buttonNameContainer: {
    // backgroundColor: theme.darkMenuBackground,
    color: theme.offWhite,
  },
  tooltipText: {
    fontSize: "13px",
    padding: "1px",
  },
  homeButton: {
    padding: "4px 0",
    paddingBottom: "10px",
    marginBottom: "6px",
    marginTop: "32px",
    borderBottom: ".2px solid rgba(128, 128, 128, 0.38)",
    width: "48px",
  },
}));

const ServerList = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

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
    server.members_ids?.forEach((member) => {
      arr.push(member.user_id);
    });
    return arr;
  };

  const myServers = servers.filter(
    (server) =>
      server.owner_id === sessionUser.id ||
      memberIdsToArr(server).includes(sessionUser.id)
  );


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

  const popperConfig = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 12], // set margin-top to 10px
        },
      },
    ],
  };

  const serverTooltip = (server) => {
    return (
      <Tooltip placement="right" id="tooltip-top">
        <div className={classes.buttonNameContainer}>
          <div className={classes.tooltipText}>{server.name}</div>
        </div>
      </Tooltip>
    );
  };

  return (
    <div>
      {isLoaded &&
        myServers.map((server) => {
          return (
            <OverlayTrigger
              trigger={["focus", "hover"]}
              placement="right"
              overlay={serverTooltip(server)}
              popperConfig={popperConfig}
              // onHide={() => setEditButtons(false)}
            >
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
            </OverlayTrigger>
          );
        })}
    </div>
  );
};

export default ServerList;
