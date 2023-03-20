import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../../../store/session";
import { ProfileModal } from "../../../../context/ProfileModal";
import EditProfileForm from "./EditProfileForm";
import { useState } from "react";
import "./EditProfileForm.css";
import FadeIn from "react-fade-in";
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

const UserTab = ({ socket }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const user = useSelector((state) => state.session.user);
  const [editModal, setEditModal] = useState(false);

  const handleEditModal = () => {
    setEditModal(true);
  };

  const popperConfig = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4], // set margin-top to 10px
        },
      },
    ],
  };

  const settingsTooltip = (
    <Tooltip placement="top" id="tooltip-top">
      <div className={classes.buttonNameContainer}>
        <div className={classes.tooltipText}>User Settings</div>
      </div>
    </Tooltip>
  );


  return (
    <>
      <div className="usertab-container">
        <div className="usertab-image-username">
          {user.image_url ? (
            <img alt="profile" src={user.image_url}></img>
          ) : (
            <>
              <div className="usertab-default-profile-image">
                <i className="fa-solid fa-user-music"></i>
              </div>
            </>
          )}
          <h4
            style={{
              textOverflow: "ellipsis",
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "155px",
            }}
          >
            {user.username}
          </h4>
        </div>
        <OverlayTrigger
            trigger={["focus", "hover"]}
            placement="top"
            overlay={settingsTooltip}
            popperConfig={popperConfig}
            // onHide={() => setEditButtons(false)}
          >
        <button onClick={handleEditModal} id="usertab-gear-icon">
          <i className="fa-solid fa-gear"></i>
        </button>
        </OverlayTrigger>
      </div>

      {editModal && (
        <ProfileModal
          className="edit-profile-modal"
          onClose={() => setEditModal(false)}
        >
          <EditProfileForm
            {...{ editModal }}
            {...{ socket }}
            {...{ setEditModal }}
          />
        </ProfileModal>
      )}
    </>
  );
};

export default UserTab;
