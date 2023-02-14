// tools
import { createUseStyles, useTheme } from "react-jss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadAllRequests} from "../../../../store/friend"
// components
import AddFriendInput from "./FriendsComponents/AddFriendInput";
import FriendsList from "./FriendsComponents/FriendsList";
import PendingRequests from "./FriendsComponents/PendingRequests";

const MePage = ({ selected, setSelected, loaded}) => {
  const user = useSelector((state) => state.session.user);
  const allServers = useSelector((state) => Object.values(state.servers));
  const myServers = allServers.filter((server) => server.owner_id === user.id);



  // useEffect(() => {
  //   if (selected === "pending") {
  //     dispatch(loadAllRequests(sessionUser.id));
  //     setLoaded(true)
  //   }
  // }, [selected]);

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
