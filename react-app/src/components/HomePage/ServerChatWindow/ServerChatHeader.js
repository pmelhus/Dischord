import { useSelector } from "react-redux";
import { useLocation, NavLink, Route, Switch } from "react-router-dom";
import FriendsInnerNav from "../Chat/MePage/FriendsComponents/FriendsInnerNav";
import DirectMessageHeader from "../Chat/MePage/DirectMessages/DirectMessageHeader";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  mainNav: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "rgba(26, 24, 24, 0.607) solid 0.2px",
  },
}));

const ServerChatHeader = ({ selected, setSelected }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const { pathname } = useLocation();
  const channel_id = parseInt(pathname.split("/")[3]);
  const url = pathname.split("/")[2];
  const urlChannels = pathname.split("/")[3];

  const channels = useSelector((state) => state.channels);

  return (
    <>
      <div className={classes.mainNav}>
        <Switch>
          <Route path="/channels/@me/*">
            <DirectMessageHeader />
          </Route>
          <Route path="/channels/@me">
            <>
              <div className="server-chat-header-container">
                <FriendsInnerNav {...{ selected }} {...{ setSelected }} />
                {/* <div id="chat-header-logo">
                  <NavLink to="/" exact={true} activeClassName="active">
                    <img
                      id="logo-chat"
                      alt="logo"
                      src="https://res.cloudinary.com/dmtap2h65/image/upload/v1655674014/DISCHORD-cropped_aekkb4.png"
                    />
                  </NavLink>
                </div> */}
              </div>
            </>
          </Route>
          <Route path="/channels/*/*">
            <div className="server-chat-header-container">
              <div className="server-chat-header">
                {url !== "@me" && urlChannels !== "noChannels" && (
                  <i
                    id="server-chat-header-hash"
                    className="fa-solid fa-hashtag"
                  ></i>
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
              {/* <div id="chat-header-logo">
                <NavLink to="/" exact={true} activeClassName="active">
                  <img
                    id="logo-chat"
                    alt="logo"
                    src="https://res.cloudinary.com/dmtap2h65/image/upload/v1655674014/DISCHORD-cropped_aekkb4.png"
                  />
                </NavLink>
              </div> */}
            </div>
          </Route>
        </Switch>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            <img
              id="logo-chat"
              alt="logo"
              src="https://res.cloudinary.com/dmtap2h65/image/upload/v1655674014/DISCHORD-cropped_aekkb4.png"
            />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ServerChatHeader;
