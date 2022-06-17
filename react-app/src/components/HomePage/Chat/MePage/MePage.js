import { useSelector } from "react-redux";

const MePage = () => {
  const user = useSelector((state) => state.session.user);
  const allServers = useSelector((state) => Object.values(state.servers));
  const myServers = allServers.filter((server) => server.owner_id === user.id);
  return (
    <>
      {!myServers.length ? (
        <div className="home-page-container">
          <div className="welcome-message">
            <h1>Welcome to Dischord, {user.username}!</h1>
            <h3>Add a server to start communicating with your peers</h3>
          </div>
          <div className="home-image-div">
            <img
              id="home-image"
              src="https://res.cloudinary.com/dmtap2h65/image/upload/v1655481454/MusicPNG_fqhod5.png"
            ></img>
          </div>
        </div>
      ) : (
        <div className="home-page-container">
          <div className="welcome-message">
            <h1>Welcome back, {user.username}!</h1>
          </div>
          <div className="home-image-div">
            <img
              id="home-image"
              src="https://res.cloudinary.com/dmtap2h65/image/upload/v1655481454/MusicPNG_fqhod5.png"
            ></img>
          </div>
        </div>
      )}
    </>
  );
};

export default MePage;
