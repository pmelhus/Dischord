import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import UserProfilePopover from "../UserProfilePopover/UserProfilePopover";
import "./UserOnlineCard.css";
import { useState } from "react";

const UserOfflineCard = ({ offline, user, currentServer }) => {
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

    <div className="offline-card-container">
      <div className="invite-image-username">
        {user.image_url ? (
          <>
            <img className="server-online-image" src={user.image_url} />
          </>
        ) : (
          <>
            <div className="user-offline-image-nourl">
              <i className="fa-solid fa-user-music"></i>
            </div>
          </>
        )}
        <span id="offline-user">{user.username}</span>
        {currentServer?.owner_id === user.id && (
          <i id="crown" className="fa-solid fa-crown"></i>
        )}
      </div>
    </div>
      </OverlayTrigger>
    </>
  );
};

export default UserOfflineCard;
