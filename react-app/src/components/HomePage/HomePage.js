import HomeNavBar from "./HomeNavBar/HomeNavBar";
import HomeContent from "./HomeContent/HomeContent";
import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { genServers } from "../../store/server";
import { genChannels} from "../../store/channel"
import { LoadingModal } from "../../context/LoadingModal";
import LoadingScreen from "../LoadingScreen";
import "./HomePage.css";
import ServerChatWindow from "./ServerChatWindow"

const HomePage = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state=>(state.session.user))

  const {pathname} = useLocation()

  console.log(parseInt(pathname.split('/')[2]))

  useEffect(() => {
    (async () => {
      await setLoadingScreen(true);
      await setTimeout(async () => {
        await dispatch(genServers(sessionUser.id));
        await dispatch(genChannels(parseInt(pathname.split('/')[2])))
        await setLoadingScreen(false);
      }, 1000);
    })();
  }, [dispatch]);

  return (
    <div className="home-page-container">
      <HomeNavBar />
      <HomeContent />
      <ServerChatWindow />
      {loadingScreen && (
        <LoadingModal>
          <LoadingScreen />
        </LoadingModal>
      )}
    </div>
  );
};

export default HomePage;
