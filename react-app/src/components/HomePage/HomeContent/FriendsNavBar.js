import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  friendSearchToBe: {
    width: "100%",
    height: "50px",
  },
  friendsTab: {
    width: "100%",
    height: "44px",
    color: theme.textGray,
  },
}));

const FriendsNavBar = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <nav>
      <div className={classes.friendSearchToBe}></div>
      <div className={classes.friendsTab}>
        <h3>Friends</h3>
      </div>
    </nav>
  );
};

export default FriendsNavBar;
