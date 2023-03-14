import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  welcomeDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 12px 0 12px",
    maxWidth: "400px",
    margin: "0",
  },
  welcomeHeading: {
    color: theme.offWhite,
    textAlign: "center",
  },
  welcomeMessage: {
    color: theme.textGray,
    margin: "8px 0",
    fontSize: "12px",
    textAlign: "center",
    padding: "0 4px",
  },
  inviteButtonDiv: {
    marginTop: "8px",
    borderRadius: "8px",
    backgroundColor: theme.serverListGray,
    alignSelf: "stretch",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.hoverBackground,
    },
  },
  inviteIcon: {
    backgroundColor: "#E989EF",
    borderRadius: "100%",
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inviteButtonContent: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
  },
  inviteFriendText: {
    color: theme.offWhite,
    fontSize: "14px",
    margin: "0 16px",
    flexGrow: "1",
  },
  inviteFriendsArrow: {
    color: theme.textGray,
    minWidth: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  messageIcon: {
    backgroundColor: "#6B88EF",
    borderRadius: "100%",
    width: "32px",
    height: "32px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const InviteFriendsWelcome = ({setHighlight, currentServer, user, setInviteModal }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      <div className={classes.welcomeDiv}>
        <h1 className={classes.welcomeHeading}>
          <p>Welcome to</p>
          <p>{currentServer?.name}</p>
        </h1>
        {currentServer?.owner_id === user?.id ? (
          <p className={classes.welcomeMessage}>
            This is your brand new, shiny server. Here are some steps to help
            you get started.{" "}
          </p>
        ) : (
          <p>
            This is a brand new, shiny server. Here are some steps to help you
            get started.{" "}
          </p>
        )}
        <div  onClick={() => setInviteModal(true)}  className={classes.inviteButtonDiv}>
          <div className={classes.inviteButtonContent}>
            <div className={classes.inviteIcon}>
              <i
                style={{ color: "white", padding: "4px" }}
                className="fa-solid fa-user-plus"
              ></i>
            </div>
            <div className={classes.inviteFriendText}>
              <p>Invite your friends</p>
            </div>
            <div className={classes.inviteFriendsArrow}>
              <i className="fa-solid fa-2xs fa-greater-than"></i>
            </div>
          </div>
        </div>
        <div onClick={()=> setHighlight(true)} className={classes.inviteButtonDiv}>
          <div className={classes.inviteButtonContent}>
            <div className={classes.messageIcon}>
              <i class="fa-sharp fa-regular fa-message"></i>
            </div>
            <div className={classes.inviteFriendText}>
              <p>Send a message</p>
            </div>
            <div className={classes.inviteFriendsArrow}>
              <i className="fa-solid fa-2xs fa-greater-than"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteFriendsWelcome;
