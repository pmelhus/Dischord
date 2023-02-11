import { createUseStyles, useTheme } from "react-jss";
import { useLocation } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  friendSearchToBe: {
    width: "100%",
    height: "50px",
    borderBottom: "rgba(26, 24, 24, 0.607) solid .2px",
  },

  tabSeparator: {
    height: "8px",
  },

  friendsTabSelected: {
    // width: "100%",
    height: "44px",
    color: theme.textGray,
    display: "flex",
    alignItems: "center",
    margin: "0 10px",
    backgroundColor: theme.selectedBackground,
    cursor: "pointer",
    borderRadius: "5px",
    '&:hover': {
      color: theme.offWhite,
    }
  },

}));

const FriendsNavBar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <nav>
      <div className={classes.friendSearchToBe}></div>
      <div className={classes.tabSeparator}></div>
      <div
        className={
          pathname === "/channels/@me"
            ? classes.friendsTabSelected
            : classes.friendsTab
        }
      >
        <i
          style={{ marginRight: "16px", marginLeft: "8px" }}
          className="fa-solid fa-lg fa-users"
        ></i>
        <h3>Friends</h3>
      </div>
    </nav>
  );
};

export default FriendsNavBar;
