import HomeNavBar from "./HomeNavBar/HomeNavBar"
import HomeContent from "./HomeContent/HomeContent"
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="home-page-container">
      <HomeNavBar />
      <HomeContent />
    </div>
  );
};

export default HomePage;
