import { useLocation } from "react-router-dom";

const HomeContent = () => {
  const { pathname } = useLocation();

  return (
    <div className="home-content-container">
      {pathname === "/channels/@me" ? (
        <div>
          <nav></nav>
        </div>
      ) : (
        <div className="server-sidebar-container">
          <nav>
            <div className="server-name-div">
              <h3>Server name</h3>
            </div>
            <div className="channel-list-div">Channels</div>
            <div className="server-nav-bottom"></div>
          </nav>
          <div className='server-userinfo-div'>
            <h3>User Info</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
