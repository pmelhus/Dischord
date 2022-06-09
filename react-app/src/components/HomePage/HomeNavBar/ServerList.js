import { useDispatch, useSelector } from "react-redux";

const ServerList = () => {
  const dispatch = useDispatch();

  const servers = useSelector((state) => Object.values(state.servers));

  return (
    <div>
      {servers.map((server) => {
        return (
          <div>
            <img src={server.image_url}></img>
          </div>
        );
      })}
    </div>
  );
};

export default ServerList;
