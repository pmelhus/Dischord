import FriendsIcon from "./FriendsIcon";
import { createUseStyles, useTheme } from "react-jss";
import { useState } from "react";

const useStyles = createUseStyles((theme) => ({
  friendIconDiv: {
    display: "flex",
    alignItems: "center",
    color: theme.offWhite,
    margin: "0 8px",
  },
  friendsNav: {
    // width: "500px",
    display: "flex",
    alignItems: "center",
  },
  divider: {
    width: "1px",
    height: "24px",
    margin: "0 8px",
    backgroundColor: theme.textGrayTrans,
  },
  addFriendButton: {
    margin: "0 12px",
    cursor: "pointer",
    backgroundColor: "rgb(45, 125, 70)",
    padding: "4px 8px",
    borderRadius: "4px",
    // boxSizing: 'border-box',
    // height: '20px',
  },
  addFriendButtonSelected: {
    margin: "0 12px",
    cursor: "default",
    // height: '20px',
    padding: "4px 8px",
    // boxSizing: 'border-box',
  },
  addFriendButtonH4: {
    color: theme.offWhite,
    fontSize: "15px",
  },
  addFriendButtonH4Selected: {
    color: "rgb(70, 196, 110)",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  allFriends: {
    boxSizing: "border-box",
    margin: "0 12px",
    padding: "2px 8px",
    cursor: "pointer",
    color: theme.textGray,
    "&:hover": {
      backgroundColor: theme.hoverBackground,
      color: theme.offWhite,
    },
    // minWidth: '40px'
  },
  allFriendsSelected: {
    boxSizing: "border-box",
    backgroundColor: theme.selectedBackground,
    margin: "0 12px",
    padding: "2px 8px",
    borderRadius: "4px",
    cursor: "default",
    color: theme.offWhite,
  },
}));

const FriendsInnerNav = ({setSelected, selected}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const iconStyle = { color: theme.textGray, marginRight: "6px" };



  return (
    <nav className={classes.friendsNav}>
      <div className={classes.friendIconDiv}>
        <FriendsIcon {...{ iconStyle }} />
      </div>
      <div className={classes.divider}></div>
      {/* 'All' button on nav */}
      <div
        onClick={() => setSelected("all")}
        className={
          selected === "all" ? classes.allFriendsSelected : classes.allFriends
        }
      >
        <h3>All</h3>
      </div>
      {/* Pending tab on nav */}

      {/* Add friend button on nav */}
      <div
        className={
          selected === "addFriend"
            ? classes.addFriendButtonSelected
            : classes.addFriendButton
        }
        onClick={() => setSelected("addFriend")}
      >
        <h3
          className={
            selected === "addFriend"
              ? classes.addFriendButtonH4Selected
              : classes.addFriendButtonH4
          }
        >
          Add Friend
        </h3>

      </div>
    </nav>
  );
};

export default FriendsInnerNav;
