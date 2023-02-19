import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    // width: "100%",
    height: "50px",
    borderBottom: "rgba(26, 24, 24, 0.607) solid .2px",
    paddingLeft: "4px",
  },
  username: {
    color: theme.offWhite,
    fontSize: "15px",
  },
}));

const DirectMessageHeader = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  // getting pathname from url
  const { pathname } = useLocation();
  const uuid = pathname.split("/")[3];
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  // grabbing state from redux for dm header username

  const inbox = useSelector((state) => Object.values(state.inboxes));

  const inboxMembers = inbox[0].inbox_members;


  // function to determine whether user is friend_id or self_id

  const determineId = (inboxMembers) => {
    const idArr = [];
    inboxMembers.forEach((id) => {
      if (id !== sessionUser.id) {
        idArr.push(id);
      }
    });
    if (idArr.length > 1) return idArr
    if (idArr.length === 1) return idArr[0]
  };

  const dmUser = users[determineId(inboxMembers)];
  console.log(dmUser, "here");

  return (
    <>
      <div className={classes.header}>
        <i
          style={{ color: theme.darkGray, padding: "0 10px" }}
          className="fa-solid fa-lg fa-at"
        ></i>
        <h4 className={classes.username}>{dmUser.username}</h4>
      </div>
    </>
  );
};

export default DirectMessageHeader;
