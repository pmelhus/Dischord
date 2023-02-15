import { createUseStyles, useTheme } from "react-jss";
import { useLocation, Route, Switch } from "react-router-dom";
import FriendsIcon from "./FriendsIcon";
import DirectMessagesList from "../DirectMessages/DirectMessagesList"

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
    "&:hover": {
      color: theme.offWhite,
    },
  },
  directMessagesDiv: {
    padding: '10px'
  },
  directMessagesP: {
    color: theme.textGray,
    fontSize: '12px',
    marginLeft: '18px'
  }
}));

const FriendsNavBar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iconStyle = { marginRight: "16px", marginLeft: "8px" };

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
        <FriendsIcon {...{ iconStyle }} />
      </div>
          <p className={classes.directMessagesP}>DIRECT MESSAGES</p>
        <div className={classes.directMessagesDiv}>
          <DirectMessagesList/>
        </div>
    </nav>
  );
};

export default FriendsNavBar;
