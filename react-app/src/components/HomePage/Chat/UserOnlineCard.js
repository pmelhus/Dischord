import { useState } from "react";
import { UserModal } from "../../../context/UserModal";
import UserModalWindow from "../../Modals/UserModalWindow";
import Alert from "react-bootstrap/Alert";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./UserOnlineCard.css";
import UserProfilePopover from "../UserProfilePopover/UserProfilePopover";

const UserOnlineCard = ({ currentServer, user }) => {
  const [userModal, setUserModal] = useState(false);

  const popover = (
    <Popover placement="left-start" id="popover-basic">
      {/* <Popover.Header as="h3">{user.username}</Popover.Header> */}

      <UserProfilePopover currentServer={currentServer} user={user} />
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        rootClose={true}
        trigger={"click"}
        placement="left-start"
        overlay={popover}
        onToggle={() => setUserModal(!userModal)}
        // onHide={() => setUserModal(false)}
        show={userModal}
      >
        <div className="online-card-container">
          <div
            className={
              userModal
                ? "invite-image-username-selected"
                : "invite-image-username"
            }
          >
            {user.image_url ? (
              <div className="online-image-with-circle">
                {user.idle ? (
                  <div className="idle-circle-background">
                    <div className="idle-circle">
                      <div className="idle-mini-circle"></div>
                    </div>
                  </div>
                ) : (
                  <div className="green-circle-background">
                    <div className="green-circle"> </div>
                  </div>
                )}

                <img className="server-online-image" src={user.image_url} />
              </div>
            ) : (
              <>
                <div className="user-online-image-nourl">
                {user.idle ? (
                  <div className="idle-circle-background">
                  <div className="idle-circle">
                    <div className="idle-mini-circle"></div>
                  </div>
                </div>
                ) : (
                  <div className="green-circle-background">
                    <div className="green-circle"> </div>
                  </div>

                )}
                <i className="fa-solid fa-user-music"></i>
                </div>
              </>
            )}
            <span>{user.username}</span>
            {currentServer.owner_id === user.id && (
              <i id="crown" className="fa-solid fa-crown"></i>
            )}
          </div>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default UserOnlineCard;
