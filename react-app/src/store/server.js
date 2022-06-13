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

const removeServer = (server) => {
  return {
    type: REMOVE_SERVER,
    payload: server,
  };
};

export const genServers = (id) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [serversResponse] = await Promise.all([fetch(`/api/servers/owner_id/${id}`)]);
  const [servers] = await Promise.all([serversResponse.json()]);

  if (serversResponse.ok) {
    dispatch(loadServers(servers.servers));
    return servers;
  }
};

export const createServer = (payload) => async (dispatch) => {
  const { name, image, publicValue, owner_id } = payload;
  const f = new FormData();
  f.append("name", name);
  f.append("public", publicValue);
  f.append("owner_id", owner_id);
  if (image) {
    // console.log(image);
    f.append("image", image);
  }
  // console.log(f);

  const [response] = await Promise.all([
    fetch(`/api/servers/`, {
      method: "POST",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addServer(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {

      let errorObjArr = [];
      data.errors.forEach((error) => {
        const errorObj = {};
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
        errorObjArr.push(errorObj);
      });
      return {'errors': errorObjArr};
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editServer = (data) => async (dispatch) => {
  // console.log("------------editcharterTHUNK");
  // console.log(data)
  // console.log("------------editcharterTHUNK");
  const { id, name, privacy, owner_id, image } = data;
  // console.log(data, '======================data')

  const f = new FormData();

  f.append("name", name);
  f.append("public", privacy);
  f.append("owner_id", owner_id);

  if (image) {
    f.append("image", image);
  }

  const [response] = await Promise.all([
    fetch(`/api/servers/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addServer(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {

      let errorObjArr = [];
      data.errors.forEach((error) => {
        const errorObj = {};
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
        errorObjArr.push(errorObj);
      });
      return {'errors': errorObjArr};
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteServer = (server) => async (dispatch) => {
  const { id } = server;
  // console.log('inside the thunk');
  // console.log('estateowner', estate.owner_id);
  // console.log("estateid", estate.id);
  // console.log(server, "=============");
  const response = await fetch(`/api/servers/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeServer(server));
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
