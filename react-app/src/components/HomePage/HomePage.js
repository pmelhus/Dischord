import HomeNavBar from "./HomeNavBar/HomeNavBar";
import HomeContent from "./HomeContent/HomeContent";
import { useState, useEffect } from "react";
import { useLocation, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genServers } from "../../store/server";
import { genChannels } from "../../store/channel";
import { genUsers } from "../../store/user";
import { genChannelMessages } from "../../store/channelMessage";
import { LoadingModal } from "../../context/LoadingModal";
import LoadingScreen from "../LoadingScreen";
import "./HomePage.css";
import { loadAllFriends, loadAllRequests } from "../../store/friend";
import ServerChatWindow from "./ServerChatWindow/ServerChatWindow";
import { getInboxes } from "../../store/inbox";
import { genDirectMessages } from "../../store/directMessage";

const HomePage = ({
  onlineMembers,
  setOnlineMembers,
  socket,
  setLoading,
  loading,
  setLocation,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const channelId = parseInt(pathname.split("/")[3]);
  const serverId = parseInt(pathname.split("/")[2]);
  const urlMe = pathname.split("/")[2];
  const [selected, setSelected] = useState("all");
  //   useEffect(() => {

  // dispatch(genServers(sessionUser.id));

  //      dispatch(genChannels(parseInt(pathname.split("/")[2])));

  //     setLoaded(true);

  // }, []);

  const componentMounted = async () => {
    await setLoadingMessages(true);
    await dispatch(genChannelMessages(channelId));
    await setLoadingMessages(false);
  };

  useEffect(async () => {
    await dispatch(genServers(sessionUser.id));
    await dispatch(genChannels(sessionUser.id));
    await dispatch(genUsers());
    const friends = await dispatch(loadAllFriends(sessionUser.id));
    await dispatch(loadAllRequests(sessionUser.id));
    await dispatch(getInboxes(sessionUser.id));

    // if user has no friends in friends list, then bring them to the add friend screen
    // otherwise user is sent to friends list with selected state
    if (!friends.friends.length) {
      setSelected("addFriend");
    }

    await setLoaded(true);
    await setLoadingScreen(false);
  }, [dispatch, loadingScreen]);

  useEffect(async () => {
    if (urlMe !== "@me" && channelId && loaded) {
      console.log(serverId);
      await componentMounted();
      await setLoadingMessages(false);
    }
  }, [channelId, dispatch, loaded, serverId]);

  useEffect(async () => {
    if (urlMe !== "@me") {
      await setLocation(channelId);
    }
  }, [pathname]);

  return (
    <div className="home-page-container">
      {loaded && (
        <>
          <HomeNavBar />
          <HomeContent {...{ setLoading }} {...{ loading }} {...{ socket }} />
          <ServerChatWindow
            {...{ onlineMembers }}
            {...{ setOnlineMembers }}
            {...{ setSelected }}
            {...{ selected }}
            {...{ socket }}
            {...{ setLoading }}
            {...{ setLoadingMessages }}
            {...{ loadingMessages }}
          />
        </>
      )}
      {loadingScreen && (
        <LoadingModal>
          <LoadingScreen />
        </LoadingModal>
      )}
    </div>
  );
};

export default HomePage;
