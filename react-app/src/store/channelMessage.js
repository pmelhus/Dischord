const ADD_CHANNEL_MESSAGE = "channelMessages/addChannelMessage";
const LOAD_CHANNEL_MESSAGES = "channelMessages/loadChannelMessages";
const REMOVE_CHANNEL_MESSAGE = "channelMessages/removeChannelMessage";

const loadChannelMessages = (channelMessages) => {
  return {
    type: LOAD_CHANNEL_MESSAGES,
    payload: channelMessages
  };
};

const addChannelMessage = (channelMessage) => {
  return {
    type: ADD_CHANNEL_MESSAGE,
    payload: channelMessage
  };
};

const removeChannelMessage = (channelMessage) => {
  return {
    type: REMOVE_CHANNEL_MESSAGE,
    payload: channelMessage
  };
};

export const genChannelMessages = (id) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [channelMessagesResponse] = await Promise.all([fetch(`/api/channel_messages/${id}`)]);
  const [channelMessages] = await Promise.all([channelMessagesResponse.json()]);

  if (channelMessagesResponse.ok) {

    dispatch(loadChannelMessages(channelMessages.channel_messages));
    return channelMessages;
  }
};

export const createChannelMessage = (payload) => async (dispatch) => {
  const edited = false;
  console.log(payload, 'PAYLOAD=========')
  const { user_id, msg, channel_id} = payload;

  const f = new FormData();
  f.append("content", msg);
  f.append("channel_id", channel_id);
  f.append("owner_id", user_id);
  f.append('edited', edited)

  const [response] = await Promise.all([
    fetch(`/api/channel_messages/`, {
      method: "POST",
      body: f,
    }),
  ]);

  console.log(response);
  if (response.ok) {
    const data = await response.json();
    dispatch(addChannelMessage(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {

      let errorObj = {};
      data.errors.forEach((error) => {

        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];

      });
      return {'errors':errorObj};
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editChannelMessage = (data) => async (dispatch) => {

  const { id, name, description, server_id} = data;


  const f = new FormData();

  f.append("name", name);
  f.append('description', description)
  f.append('server_id', server_id)

  const [response] = await Promise.all([
    fetch(`/api/channelMessages/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addChannelMessage(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {

      let errorObj = {};
      data.errors.forEach((error) => {

        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];

      });
      return {'errors':errorObj};
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const deleteChannelMessage = (channelMessage) => async (dispatch) => {
  const { id } = channelMessage;
  // console.log('inside the thunk');
  // console.log('estateowner', estate.owner_id);
  // console.log("estateid", estate.id);
  // console.log(channelMessage, "=============");
  const response = await fetch(`/api/channel_messages/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(removeChannelMessage(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {

      let errorObj = {};
      data.errors.forEach((error) => {

        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];

      });
      return {'errors':errorObj};
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

const channelMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHANNEL_MESSAGE:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_CHANNEL_MESSAGE:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_CHANNEL_MESSAGES:
      const channelMessageData = {};
      console.log(action.payload)
        for (let channelMessage of action.payload) {
          channelMessageData[channelMessage.id] = channelMessage;
        }
        return { ...channelMessageData };

    default:
      return state;
  }
};

export default channelMessageReducer;
