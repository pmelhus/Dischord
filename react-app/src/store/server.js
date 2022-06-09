const ADD_SERVER = "servers/addServer";
const LOAD_SERVERS = "servers/loadServers";
const REMOVE_SERVER = "servers/removeServer";

const loadServers = (servers) => {
  return {
    type: LOAD_SERVERS,
    payload: servers,
  };
};

const addServer = (server) => {
  return {
    type: ADD_SERVER,
    payload: server,
  };
};

export const genServers = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [serversResponse] = await Promise.all([fetch("/api/servers/")]);
  const [servers] = await Promise.all([serversResponse.json()]);

  if (serversResponse.ok) {
    dispatch(loadServers(servers.servers));
    return servers;
  }
};

export const createServer = (payload) => async (dispatch) => {
  const { name, image, publicValue, user_id } = payload;
  const f = new FormData();
  f.append("name", name);
  f.append("public", publicValue);
  f.append("user_id", user_id);
  if (image) {
    // console.log(image);
    f.append("image", image);
  }
  console.log(f)

  const response = await fetch(`/api/servers/`, {
    method: "POST",
    body: f,
  });

  const serverData = await response.json();
  // console.log(estateData);
  if (response.ok) {
    dispatch(addServer(serverData));
    return serverData;
  } else {
    return serverData;
  }
};

const serverReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SERVER:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_SERVER:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_SERVERS:
      const serverData = {};
      for (let server of action.payload) {
        serverData[server.id] = server;
      }
      return { ...serverData };
    default:
      return state;
  }
};

export default serverReducer;
