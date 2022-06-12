import HomeNavBar from "./HomeNavBar/HomeNavBar";
import HomeContent from "./HomeContent/HomeContent";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { genServers } from "../../store/server";
import { genChannels } from "../../store/channel";
import { LoadingModal } from "../../context/LoadingModal";
import LoadingScreen from "../LoadingScreen";
import "./HomePage.css";
import ServerChatWindow from "./ServerChatWindow";

const HomePage = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);

//   useEffect(() => {

// dispatch(genServers(sessionUser.id));


//      dispatch(genChannels(parseInt(pathname.split("/")[2])));

//     setLoaded(true);

// }, []);

  useEffect(async() => {

      if (sessionUser) {
        await dispatch(genServers(sessionUser.id));
      }

        await dispatch(genChannels());

      await setLoaded(true);

  }, [dispatch, pathname]);

  return (
    <div className="home-page-container">
      {loaded && (
        <>
          <HomeNavBar />
          <HomeContent />
          <ServerChatWindow />
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
