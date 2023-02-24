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

const MePage = ({ selected, setSelected, loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMutualFriends(sessionUser.id));
  }, [dispatch]);

  // const requests = useSelector((state) => Object.values(state.friends.requests));

  return (
    <>
      {selected === "addFriend" && <AddFriendInput />}
      {selected === "all" && <FriendsList />}
      {selected === "pending" && loaded && <PendingRequests />}
      {selected === "suggested" && <SuggestedFriends />}
    </>
  );
};

export default MePage;
