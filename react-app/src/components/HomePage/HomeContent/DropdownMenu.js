import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  menuDiv:{
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: '3px'
  },

  serverName: {
    marginRight: "6px",
  },
  serverEditList: {
    width: "100%",
    margin: "0",
    padding: "0",
    height: '100%',

  },
  listButton: {
    display: "flex",
    width: "240px",
    justifyContent: "space-between",
    padding: "4px 15px",
    cursor: "pointer",
    color: theme.textGray,
    "&:hover": {backgroundColor: theme.darkInputBackground}
  },
}));

const DropdownMenu = ({
  setInviteModal,
  setShowEditModal,
  sessionUser,
  currentServer,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      <div className={classes.menuDiv}>
        <ul className={classes.serverEditList}>
          <div
            className={classes.listButton}
            onClick={() => setInviteModal(true)}
          >
            <p>Invite people</p>
            <i className="fa-solid fa-person-circle-plus"></i>
          </div>

          {currentServer?.owner_id === sessionUser.id && (
            <div
              className={classes.listButton}
              onClick={() => setShowEditModal(true)}
            >
              <p>Server Settings</p>
              <i className="fa-solid fa-gear"></i>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default DropdownMenu;
