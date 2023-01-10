import HomeNavBar from "./HomeNavBar/HomeNavBar";
import HomeContent from "./HomeContent/HomeContent";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genServers } from "../../store/server";
import { genChannels } from "../../store/channel";
import { genUsers } from "../../store/user";
import { genChannelMessages } from "../../store/channelMessage";
import { LoadingModal } from "../../context/LoadingModal";
import LoadingScreen from "../LoadingScreen";
import "./HomePage.css";
import ServerChatWindow from "./ServerChatWindow/ServerChatWindow";

const HomePage = ({
  onlineMembers,
  setOnlineMembers,
  socket,
  setLoading,
  loading,
}) => {
  const [loadingScreen, setLoadingScreen] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);

  const channelId = parseInt(pathname.split("/")[3]);
  const serverId = parseInt(pathname.split("/")[2]);
  //   useEffect(() => {

  // dispatch(genServers(sessionUser.id));

  //      dispatch(genChannels(parseInt(pathname.split("/")[2])));

  //     setLoaded(true);

  // }, []);

  useEffect(async () => {
    await dispatch(genServers(sessionUser.id));
    await dispatch(genChannels(sessionUser.id));
    await dispatch(genUsers());
    await setLoaded(true);
  }, [dispatch]);

  useEffect(async () => {
    if (channelId && loaded) {
      await dispatch(genChannelMessages(channelId));
    }
  }, [pathname, dispatch, loaded]);

  return (
    <div className="home-page-container">
      {loaded && (
        <>
          <HomeNavBar />
          <HomeContent {...{ setLoading }} {...{ loading }} {...{ socket }} />
          <ServerChatWindow
            {...{ onlineMembers }}
            {...{ setOnlineMembers }}
            {...{ socket }}
            {...{ setLoading }}
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
