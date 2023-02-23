// tools
import { createUseStyles, useTheme } from "react-jss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllRequests, loadMutualFriends } from "../../../../store/friend";
// components
import AddFriendInput from "./FriendsComponents/AddFriendInput";
import FriendsList from "./FriendsComponents/FriendsList";
import PendingRequests from "./FriendsComponents/PendingRequests";

const MePage = ({ selected, setSelected, loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selected === "all") {
      dispatch(loadMutualFriends(sessionUser.id));
    }
  }, [selected]);

  // const requests = useSelector((state) => Object.values(state.friends.requests));

  return (
    <>
      {selected === "addFriend" && <AddFriendInput />}
      {selected === "all" && <FriendsList />}
      {selected === "pending" && loaded && <PendingRequests />}
    </>
  );
};

export default MePage;
