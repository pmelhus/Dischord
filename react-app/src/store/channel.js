const ADD_CHANNEL = "channels/addChannel";
const LOAD_CHANNELS = "channels/loadChannels";
const REMOVE_CHANNEL = "channels/removeChannel";
const LOAD_ALL_CHANNELS = 'channels/loadAllChannels'

const loadChannels = (channels) => {
  return {
    type: LOAD_CHANNELS,
    payload: channels
  };
};

const loadAllChannels = (channels) => {
  return {
    type: LOAD_ALL_CHANNELS,
    payload: channels
  };
};

const addChannel = (channel) => {
  return {
    type: ADD_CHANNEL,
    payload: channel
  };
};

const removeChannel = (channel) => {
  return {
    type: REMOVE_CHANNEL,
    payload: channel
  };
};

export const genChannels = (id) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [channelsResponse] = await Promise.all([fetch(`/api/channels/${id}`)]);
  const [channels] = await Promise.all([channelsResponse.json()]);

  if (channelsResponse.ok) {
    dispatch(loadChannels(channels.channels));
    return channels;
  }
};

export const genAllChannels = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [channelsResponse] = await Promise.all([fetch(`/api/channels/`)]);
  const [channels] = await Promise.all([channelsResponse.json()]);

  if (channelsResponse.ok) {
    dispatch(loadAllChannels(channels.channels));
    return channels;
  }
};

export const createChannel = (payload) => async (dispatch) => {
  const { name, description, server_id} = payload;
  const f = new FormData();
  f.append("name", name);
  f.append("description", description);
  f.append("server_id", server_id);

  const [response] = await Promise.all([
    fetch(`/api/channels/`, {
      method: "POST",
      body: f,
    }),
  ]);


  if (response.ok) {
    const data = await response.json();
    dispatch(addChannel(data));
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

export const editChannel = (data) => async (dispatch) => {

  const { id, name, description, server_id} = data;


  const f = new FormData();

  f.append("name", name);
  f.append('description', description)
  f.append('server_id', server_id)

  const [response] = await Promise.all([
    fetch(`/api/channels/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addChannel(data));
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

export const deleteChannel = (channel) => async (dispatch) => {
  const { id } = channel;

  const response = await fetch(`/api/channels/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(removeChannel(data));
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

const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_CHANNEL:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_CHANNELS:
      const channelData = {};

      for (let channel of action.payload) {
        channelData[channel.id] = channel;
      }
      return { ...channelData };
    case LOAD_ALL_CHANNELS:
      const allChannels = {}
      for (let channel of action.payload) {
        allChannels[channel.id] = channel;
      }
      return { ...allChannels};
    default:
      return state;
  }
};

export default channelReducer;
