// tools
import { useSelector } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";
import { useState } from "react";
// components
import AddFriendInput from "./FriendsComponents/AddFriendInput";
import FriendsList from "./FriendsComponents/FriendsList"
import PendingRequests from "./FriendsComponents/PendingRequests"

const MePage = ({selected, setSelected}) => {


  const user = useSelector((state) => state.session.user);
  const allServers = useSelector((state) => Object.values(state.servers));
  const myServers = allServers.filter((server) => server.owner_id === user.id);

  return (
    <>
    {selected === 'addFriend' &&
      <AddFriendInput />
    }
    {selected === 'all' &&
    <FriendsList/>
    }
      {selected === 'pending' &&
    <PendingRequests/>
    }
    </>
  );
};

export default MePage;
