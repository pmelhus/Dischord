import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import ServerEditModal from "./ServerEditModal";
import ChannelList from "./ChannelList";
import UserTab from "./User/UserTab";
import InviteUser from "./InviteUser";

const HomeContent = ({ socket }) => {
  //react
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const [inviteModal, setInviteModal] = useState(false);

  // redux
  const servers = useSelector((state) => Object.values(state.servers));
  const sessionUser = useSelector((state) => state.session.user);
  const [showInviteButton, setShowInviteButton] = useState(true);
  // finds server based on url params id

  const currentServer = useSelector((state) => state.servers)[
    parseInt(pathname.split("/")[2])
  ];

  const openMenu = () => {
    if (showDropdown) return;
    setShowDropdown(true);
  };

  useEffect(() => {
    if (!showDropdown) return;

    const closeMenu = () => {
      setShowDropdown(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showDropdown]);

  useEffect(() => {
    setShowInviteButton(true);
  }, [pathname]);

  return (
    <div className="home-content-container">
      {pathname === "/channels/@me" ? (
        <div className="server-sidebar-container">
          <nav></nav>

          <UserTab {...{ socket }} />
        </div>
      ) : (
        <div className="server-sidebar-container">
          <nav>
            <button
              id="server-name-div-button"
              onClick={() => setShowDropdown(true)}
            >
              <div className="server-name-div">
                <h3>{currentServer?.name}</h3>

                {showDropdown ? (
                  <>
                    <i className="fa-solid fa-xmark"></i>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-angle-down"></i>
                  </>
                )}
              </div>
            </button>

            {showEditModal && (
              <div>
                <Modal onClose={() => setShowEditModal(false)}>
                  <ServerEditModal setShowEditModal={setShowEditModal} />
                </Modal>
              </div>
            )}

            {showDropdown && currentServer?.owner_id === sessionUser.id && (
              <div className="dropdown-container">
                <ul id="profile-dropdown-nav">
                  <li>
                    <button onClick={() => setInviteModal(true)}>
                      <p>Invite people</p>
                      <i className="fa-solid fa-person-circle-plus"></i>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setShowEditModal(true)}>
                      <p>Server Settings</p>
                      <i className="fa-solid fa-gear"></i>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {currentServer?.owner_id === sessionUser.id && showInviteButton && (
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
                    id="invite-button"
                    onClick={() => setInviteModal(true)}
                  >
                    Invite People
                  </button>
                </div>
              </div>
            )}

            <div className="channel-list-container">
              <ChannelList />
            </div>
            <div className="server-nav-bottom">
              <UserTab {...{ socket }} />
            </div>
          </nav>
        </div>
      )}
      {inviteModal && (
        <Modal onClose={() => setInviteModal(false)}>
          <InviteUser
            {...{ socket }}
            {...{ currentServer }}
            {...{ setInviteModal }}
          />
        </Modal>
      )}
    </div>
  );
};

export default HomeContent;
