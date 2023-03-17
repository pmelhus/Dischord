import { useLocation, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import ServerEditModal from "./ServerEditModal";
import ChannelList from "./ChannelList";
import UserTab from "./User/UserTab";
import InviteUser from "./InviteUser";
import FriendsNavBar from "../Chat/MePage/FriendsComponents/FriendsNavBar.js";
import { createUseStyles, useTheme } from "react-jss";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DropdownMenu from "./DropdownMenu";

const useStyles = createUseStyles((theme) => ({
  serverName: {
    marginRight: "6px",
  },
  serverEditList: {
    width: "100%",
    margin: "0",
    padding: "0",
  },
  listButton: {
    display: "flex",
    width: "244px",
    justifyContent: "space-between",
    padding: "4px 15px",
    cursor: "pointer",
  },
}));

const HomeContent = ({ socket, setLoading, loading }) => {
  // jss
  const theme = useTheme();
  const classes = useStyles({ theme });

  //react
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const [inviteModal, setInviteModal] = useState(false);

  // redux
  const servers = useSelector((state) => Object.values(state.servers));
  const sessionUser = useSelector(state => (state.session.user));
  const [showInviteButton, setShowInviteButton] = useState(true);
  // finds server based on url params id

  const currentServer = useSelector((state) => state.servers)[
    parseInt(pathname.split("/")[2])
  ];

  useEffect(() => {
    setShowInviteButton(true);
  }, [pathname]);

  console.log(showDropdown, 'DROPDOWN')
  const popover = (
    <Popover
      placement="bottom-start"
      id="popover-basic"
      style={{ marginTop: '-4px', marginRight: '4px'}}
    >
      {/* <Popover.Header as="h3">{user.username}</Popover.Header> */}

      <DropdownMenu
        {...{ currentServer }}
        {...{ sessionUser }}
        {...{ setShowEditModal }}
        {...{ setInviteModal }}
        {...{setShowDropdown}}
      />
    </Popover>
  );

  return (
    <div className="home-content-container">
      <Route path="/channels/@me">
        <div className="server-sidebar-container">
          <FriendsNavBar />

          <UserTab {...{ socket }} />
        </div>
      </Route>

      <Route path="/channels/*/*">
        <div className="server-sidebar-container">
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              flexGrow: "0",
            }}
          >
            <div style={{ flexGrow: "0" }}>
              <OverlayTrigger
                rootClose={showDropdown}
                trigger="click"
                placement="bottom"
                overlay={popover}
                onToggle={() => setShowDropdown(!showDropdown)}
                // onHide={() => setUserModal(false)}
                show={showDropdown}

              >
                <div onClick={() => setShowDropdown(!showDropdown)} className="server-name-div">
                  <h3 className={classes.serverName}>{currentServer?.name}</h3>

                  {showDropdown ? (
                    <>
                      <i onClick={() => setShowDropdown(false)}  className="fa-solid fa-xmark"></i>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-angle-down"></i>
                    </>
                  )}
                </div>
              </OverlayTrigger>
              {showEditModal && (
                <div>
                  <Modal onClose={() => setShowEditModal(false)}>
                    <ServerEditModal />
                  </Modal>
                </div>
              )}

              {currentServer?.owner_id === sessionUser.id &&
                showInviteButton && (
                  <div id="invite-button-div">
                    <div className="invite-profile-icon-div">
                      <button
                        id="invite-cancel-button"
                        onClick={() => setShowInviteButton(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <img
                        id="invite-profile"
                        alt="profile-default"
                        src="https://cdn0.iconfinder.com/data/icons/audio-25/24/person-profile-listen-headphones-music-head-512.png"
                      ></img>
                    </div>
                    <div>
                      <button
                        className="signup-login-button"
                        onClick={() => setInviteModal(true)}
                      >
                        Invite Friends
                      </button>
                    </div>
                  </div>
                )}

              <ChannelList {...{ setLoading }} {...{ loading }} />
            </div>
            <div>
              <div className="server-nav-bottom">
                <UserTab {...{ socket }} />
              </div>
            </div>
          </nav>
        </div>
      </Route>

      {inviteModal && (
        <Modal onClose={() => setInviteModal(false)}>
          <InviteUser
            {...{ socket }}
            {...{ currentServer }}
            {...{ setInviteModal }}
            {...{ sessionUser }}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomeContent;
