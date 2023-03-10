const ADD_DIRECT_MESSAGE = "directMessages/addDirectMessage";
const LOAD__MESSAGES = "directMessages/loadDirectMessages";
const REMOVE_DIRECT_MESSAGE = "directMessages/removeDirectMessage";

const loadDirectMessages = (directMessages) => {
  return {
    type: LOAD__MESSAGES,
    payload: directMessages,
  };
};

const addDirectMessage = (directMessage) => {
  return {
    type: ADD_DIRECT_MESSAGE,
    payload: directMessage,
  };
};

const removeDirectMessage = (directMessage) => {
  return {
    type: REMOVE_DIRECT_MESSAGE,
    payload: directMessage,
  };
};

export const genDirectMessages = (id) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...


  const [directMessagesResponse] = await Promise.all([
    fetch(`/api/direct_messages/${id}`),
  ]);
  const [directMessages] = await Promise.all([directMessagesResponse.json()]);
  if (directMessagesResponse.ok) {
    dispatch(loadDirectMessages(directMessages.direct_messages));
    return directMessages;
  }
};

export const createDirectMessage = (payload) => async (dispatch) => {
  const edited = false;
  // console.log(payload, 'PAYLOAD=========')
  const { user_id, msg, inbox_id, server_invite, server_invite_id } = payload;
  console.log(payload, 'payload here')

  const f = new FormData();
  f.append("content", msg);
  f.append("inbox_id", inbox_id);
  f.append("owner_id", user_id);
  f.append("edited", edited);
  if (server_invite) {
    f.append('server_invite_id', server_invite_id)
    f.append('server_invite', server_invite)
  }

  const [response] = await Promise.all([
    fetch(`/api/direct_messages/`, {
      method: "POST",
      body: f,
    }),
  ]);

  // console.log(response);
  if (response.ok) {
    const data = await response.json();
    dispatch(addDirectMessage(data));
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

export const editInboxMessage = (payload) => async (dispatch) => {
  const { id, content, inbox_id, owner_id, edited } = payload;
  // console.log(payload, 'HEEERE')
  const f = new FormData();
  f.append("content", content);
  f.append("inbox_id", inbox_id);
  f.append("owner_id", owner_id);
  f.append("edited", edited);

  const [response] = await Promise.all([
    fetch(`/api/direct_messages/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addDirectMessage(data));
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

export const deleteChannelMessage = (directMessage) => async (dispatch) => {
  // console.log(directMessage, 'HIYA')
  const { id } = directMessage;
  const response = await fetch(`/api/direct_messages/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(removeDirectMessage(data));
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

const directMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DIRECT_MESSAGE:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_DIRECT_MESSAGE:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD__MESSAGES:
      const directMessageData = {};
      // console.log(action.payload)
      if (action.payload) {
        for (let directMessage of action.payload) {
          directMessageData[directMessage.id] = directMessage;
        }
        return { ...directMessageData };
      }

    default:
      return state;
  }
};

export default directMessageReducer;
