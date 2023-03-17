const ADD_SERVER = "servers/addServer";
const ADD_SERVER_MEMBER = "servers/addServerMember";
const LOAD_SERVERS = "servers/loadServers";
const REMOVE_SERVER = "servers/removeServer";
const LOAD_SERVER = "servers/loadServer";
const REMOVE_SERVER_MEMBER = "serverMembers/removeServerMember";
const LOAD_ONE_SERVER = "servers/loadOneServer";

const loadServers = (servers) => {
  return {
    type: LOAD_SERVERS,
    payload: servers,
  };
};

const loadOneServer = (server) => {
  return { type: LOAD_ONE_SERVER, payload: server };
};

const loadServer = (serverMembers) => {
  return {
    type: LOAD_SERVER,
    payload: serverMembers,
  };
};

const addServerMember = (serverMember) => {
  return {
    type: ADD_SERVER_MEMBER,
    payload: serverMember,
  };
};

const removeServerMember = (serverMember) => {
  return {
    type: REMOVE_SERVER_MEMBER,
    payload: serverMember,
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

export const genServerMembers = (server_id) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...

  const [serverMembersResponse] = await Promise.all([
    fetch(`/api/servers/server_members/${server_id}`),
  ]);
  const [server] = await Promise.all([serverMembersResponse.json()]);
  if (serverMembersResponse.ok) {
    dispatch(loadServer(server));
    return server.members;
  }
};

export const genOneServer = (id) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...

  const [serverResponse] = await Promise.all([fetch(`/api/servers/${id}`)]);
  // console.log(serversResponse, 'SERVER RESPONSE HERE')
  const [server] = await Promise.all([serverResponse.json()]);

  if (serverResponse.ok) {
    dispatch(loadOneServer(server.server));
    return server;
  }
};

export const genServers = (userId) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  console.log(userId, "YO");
  const [serversResponse] = await Promise.all([
    fetch(`/api/servers/usersServers/${userId}`),
  ]);
  // console.log(serversResponse, 'SERVER RESPONSE HERE')
  const [servers] = await Promise.all([serversResponse.json()]);

  if (serversResponse.ok) {
    dispatch(loadServers(servers.servers));
    return servers;
  }
};

export const createServer = (payload) => async (dispatch) => {
  const { name, image, publicValue, owner_id } = payload;
  // console.log(payload)
  const f = new FormData();
  f.append("name", name);
  f.append("public", publicValue);
  f.append("owner_id", owner_id);
  if (image) {
    // console.log(image);
    f.append("image", image);
  }

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
    console.log(data);
    if (data.errors) {
      console.log(data.errors);
      let errorObj = {};
      data.errors.forEach((error) => {
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
      });
      return { errors: errorObj };
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
      let errorObj = {};
      data.errors.forEach((error) => {
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
      });
      return { errors: errorObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteServer = (server) => async (dispatch) => {
  const { id } = server;
  console.log(server);
  // console.log('inside the thunk');
  // console.log('estateowner', estate.owner_id);
  // console.log("estateid", estate.id);
  // console.log(server, "=============");
  const [response] = await Promise.all([
    fetch(`/api/servers/${id}`, {
      method: "DELETE",
    }),
  ]);
  if (response.ok) {
    dispatch(removeServer(server));
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      let errorObj = {};
      data.errors.forEach((error) => {
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
      });
      return { errors: errorObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const createServerMember = (payload) => async (dispatch) => {
  const { user_id, server_id } = payload;

  // console.log(payload, 'PAYLOAD=========')
  const [response] = await Promise.all([
    fetch(`/api/servers/server_members/${server_id}/${user_id}`, {
      method: "POST",
    }),
  ]);

  // console.log(response);
  if (response.ok) {
    const data = await response.json();
    dispatch(addServerMember(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      let errorObj = {};
      data.errors.forEach((error) => {
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
      });
      return { errors: errorObj };
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteServerMember = (serverMember) => async (dispatch) => {
  // console.log(serverMember, 'HIYA')
  const { id } = serverMember;
  const response = await fetch(`/api/server_members/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(removeServerMember(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      let errorObj = {};
      data.errors.forEach((error) => {
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
      });
      return { errors: errorObj };
    }
  } else {
    return ["An error occurred. Please try again."];
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

    case REMOVE_SERVER_MEMBER:
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    case LOAD_SERVER:
      const serverMemberData = {};
      // console.log(action.payload)
      if (action.payload) {
        for (let serverMember of action.payload) {
          serverMemberData[serverMember.id] = serverMember;
        }
        return { ...serverMemberData };
      }
    case LOAD_ONE_SERVER:
      return { ...state, requestedServer: action.payload };
    case ADD_SERVER_MEMBER:
      // console.log(action.payload)
      return { ...state, [action.payload.server.id]: action.payload.server };
    default:
      return state;
  }
};

export default serverReducer;
