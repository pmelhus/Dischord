const LOAD_SERVER_MEMBERS = "servers/getServerMembers"


const getServerMembers = (serverMembers) => {
  return {
    type: LOAD_SERVER_MEMBERS,
    payload: serverMembers,
    }
}

export const getAllServerMembers = (userId, serverId) => async (dispatch) => {

  const response = await fetch(`/api/servers/server_members/${userId}/${serverId}`)
  if (response.ok) {
    const serverMembers = await response.json();

    dispatch(getServerMembers(serverMembers))
    return serverMembers
  } else {
    return ["Your fetch request failed."]
  }
}


const serverMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SERVER_MEMBERS:
      return {loadedServerMembers: action.payload}
    default:
      return state;
  }
};

export default serverMemberReducer;
