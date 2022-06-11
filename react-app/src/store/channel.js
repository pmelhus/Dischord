const ADD_CHANNEL = "channels/addChannel";
const LOAD_CHANNELS = "channels/loadChannels";
const REMOVE_CHANNEL = "channels/removeChannel";

const loadChannels = (channels) => {
  return {
    type: LOAD_CHANNELS,
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
  const [channelsResponse] = await Promise.all([fetch(`/api/channels/server/${id}`)]);
  const [channels] = await Promise.all([channelsResponse.json()]);

  if (channelsResponse.ok) {
    dispatch(loadChannels(channels.channels));
    return channels;
  }
};

export const createChannel = (payload) => async (dispatch) => {
  const { name, image, publicValue, owner_id } = payload;
  const f = new FormData();
  f.append("name", name);
  f.append("public", publicValue);
  f.append("owner_id", owner_id);
  if (image) {
    // console.log(image);
    f.append("image", image);
  }
  console.log(f);

  const response = await fetch(`/api/channels`, {
    method: "POST",
    body: f,
  });

  const channelData = await response.json();
  // console.log(estateData);
  if (response.ok) {
    dispatch(addChannel(channelData));
    return channelData;
  } else {
    return channelData;
  }
};

export const editChannel = (data) => async (dispatch) => {
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
    fetch(`/api/channels/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  const channelData = await response.json();
  // console.log(channelData);
  dispatch(addChannel(channelData));
  return { ...channelData };
};

export const deleteServer = (channel) => async (dispatch) => {
  const { id } = channel;
  // console.log('inside the thunk');
  // console.log('estateowner', estate.owner_id);
  // console.log("estateid", estate.id);
  // console.log(channel, "=============");
  const response = await fetch(`/api/channels/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeChannel(channel));
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
    default:
      return state;
  }
};

export default channelReducer;
