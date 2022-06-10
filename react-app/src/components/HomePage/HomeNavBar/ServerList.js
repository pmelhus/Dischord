import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"

const ServerList = () => {

  // const dispatch = useDispatch();
  const history = useHistory()

  const servers = useSelector((state) => Object.values(state.servers));

  const handleClick = (server) => {
    // console.log('=====', server)
     return history.push(`/channels/${server.id}`)
  }

  return (
    <div>
      {servers.map((server) => {
        return (
          <div key={server.id} className="server-list-div">
            <button className="server-image-icon-button" onClick={() => handleClick(server)}>
              <img alt='Server profile icon' className="server-image-icon" src={server.image_url}></img>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ServerList;
