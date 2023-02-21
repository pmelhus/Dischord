import { useDispatch, useSelector } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

const useStyles = createUseStyles((theme) => ({
  inboxesContainer: {},
  inboxesNav: {},
  inboxContainer: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    padding: "1px",
    "&:hover": {
      backgroundColor: theme.hoverBackground,
      cursor: "pointer",
      color: "blue",
    },
  },
  inboxContainerSelected: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    padding: "1px",
    "&:hover": {
      backgroundColor: theme.hoverBackground,
      cursor: "pointer",
      color: "blue",
    },
    backgroundColor: theme.selectedBackground,
  },
  avatar: {
    width: "32px",
    height: "32px",
    objectFit: "cover",
    borderRadius: "100%",
  },
  username: {
    paddingLeft: "12px",
    color: theme.textGray,
    fontSize: "16px",
    fontWeight: "500",
    fontStyle: "normal",
    textDecoration: "none",
  },
}));

const DirectMessagesInboxes = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const inboxes = useSelector((state) => Object.values(state.inboxes));
  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);

  // state for which inbox is selected
  const [selected, setSelected] = useState();

  const history = useHistory();

  const { pathname } = useLocation();

  const urlArr = pathname.split("/");

  const handleInboxClick = (uuid) => {
    setSelected(uuid);
    history.push(`/channels/@me/${uuid}`);
  };

  return (
    <div className={classes.inboxesContainer}>
      <nav className={classes.inboxesNav}>
        {inboxes.map((inbox) => {
          // determines which id is not the current session user
          const determineUser = (inboxMembers) => {
            let returnId = null;
            let isMember = false;
            inboxMembers?.forEach((id) => {
              if (id === sessionUser.id) {
                isMember = true;
              }
              if (id !== sessionUser.id) {
                returnId = id
              }
            });
            if (isMember) return returnId
          };
          const user = users[determineUser(inbox?.inbox_members)];

          return (
            <div
              onClick={() => handleInboxClick(inbox.uuid)}
              className={
                selected === inbox.uuid && urlArr[3]
                  ? classes.inboxContainerSelected
                  : classes.inboxContainer
              }
            >
              {user && (
                <>
                  <img src={user.image_url} className={classes.avatar}></img>
                  <h3 className={classes.username}>{user.username}</h3>
                </>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default DirectMessagesInboxes;
