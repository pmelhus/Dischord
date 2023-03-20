// tools
import { createUseStyles, useTheme } from "react-jss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllRequests, loadMutualFriends } from "../../../../store/friend";
// components
import AddFriendInput from "./FriendsComponents/AddFriendInput";
import FriendsList from "./FriendsComponents/FriendsList";
import PendingRequests from "./FriendsComponents/PendingRequests";
import SuggestedFriends from "./FriendsComponents/SuggestedFriends";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const useStyles = createUseStyles((theme) => ({

  
}));

const MePage = ({ selected, setSelected, loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const friendsList = useSelector((state) =>
    Object.values(state.friends.friendships)
  );
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMutualFriends(sessionUser.id));
  }, [dispatch]);

  const friendTooltip = (
    <Tooltip placement="bottom" id="tooltip-top">
      <div className={classes.buttonNameContainer}>
        <div className={classes.tooltipText}>Add a friend</div>
      </div>
    </Tooltip>
  );

  const popperConfig = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 6], // set margin-top to 10px
        },
      },
    ],
  };

  const emptyFriendsListFunc = () => {
    if (friendsList.length) {
      return false
    } else {
      return true
    }
  }

  console.log(emptyFriendsListFunc())

  // const requests = useSelector((state) => Object.values(state.friends.requests));

  return (
    <>
      {selected === "addFriend" && (
        <OverlayTrigger
          placement="bottom"
          overlay={friendTooltip}
          popperConfig={popperConfig}
          show={emptyFriendsListFunc() }
        >
          <AddFriendInput />
        </OverlayTrigger>
      )}
      {selected === "all" && <FriendsList />}
      {selected === "pending" && loaded && <PendingRequests />}
      {selected === "suggested" && <SuggestedFriends />}
    </>
  );
};

export default MePage;
