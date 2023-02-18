import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    // width: "100%",
    height: "50px",
    borderBottom: "rgba(26, 24, 24, 0.607) solid .2px",
    paddingLeft: '4px'
  },
  username: {
    color: theme.offWhite,
    fontSize: '15px'
  }
}));

const DirectMessageHeader = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  // getting pathname from url
  const { pathname } = useLocation();
  const uuid = pathname.split("/")[3];
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users)

  // grabbing state from redux for dm header username
  const friendships = useSelector((state) =>
    Object.values(state.friends.friendships)
  );


  const dmFriendship = friendships.find((friend) => friend.dm_uuid === uuid);

  // function to determine whether user is friend_id or self_id

  const determineId = (friend) => {
    if (sessionUser.id === friend.friend_id) {
      return friend.self_id;
    }
    if (sessionUser.id === friend.self_id) {
      return friend.friend_id;
    }
  };

  const dmUser = users[determineId(dmFriendship)]
  console.log(dmUser, 'here')

  return (
    <>
      <div className={classes.header}>
        <i style={{color: theme.darkGray, padding: '0 10px'}} className="fa-solid fa-lg fa-at"></i>
        <h4 className={classes.username}>{dmUser.username}</h4>
      </div>
    </>
  );
};

export default DirectMessageHeader;
