import { useSelector } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  addFriendHeader: {
    color: theme.offWhite
  }
}))

const MePage = () => {
  const user = useSelector((state) => state.session.user);
  const allServers = useSelector((state) => Object.values(state.servers));
  const myServers = allServers.filter((server) => server.owner_id === user.id);
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <>
  <div className={classes.addFriendHeader}>
    <h4>
      ADD FRIEND
    </h4>
    <p style={{color: theme.textGray, fontSize: '12px'}}>You can add a friend with their Dishord Tag. It's cAsE sEnSitivE!</p>
    <input></input>
  </div>
    </>
  );
};

export default MePage;
