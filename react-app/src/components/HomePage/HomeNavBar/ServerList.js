import { useDispatch, useSelector } from "react-redux";

const ServerList = () => {
  const dispatch = useDispatch();

  const servers = useSelector((state) => Object.values(state.servers));

  return (
    <div>
      {servers.map((server) => {
        return (
          <div>
            <button className="server-image-icon-button">
              <img className="server-image-icon" src={server.image_url}></img>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ServerList;
