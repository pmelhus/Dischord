import HomeNavBar from "./HomeNavBar/HomeNavBar";
import HomeContent from "./HomeContent/HomeContent";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { genServers } from "../../store/server";
import { LoadingModal } from "../../context/LoadingModal";
import LoadingScreen from "../LoadingScreen";
import "./HomePage.css";

const HomePage = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setLoadingScreen(true);
      await setTimeout(async () => {
        await dispatch(genServers());
        await setLoadingScreen(false);
      }, 1000);
    })();
  }, [dispatch]);

  return (
    <div className="home-page-container">
      <HomeNavBar />
      <HomeContent />
      {loadingScreen && (
        <LoadingModal>
          <LoadingScreen />
        </LoadingModal>
      )}
    </div>
  );
};

export default HomePage;
