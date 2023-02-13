const ADD_FRIENDSHIP = "friends/addFriendship";
const ADD_FRIEND_REQUEST = "friends/addFriendRequest";
const LOAD_FRIENDS = "friends/loadFriends";
const LOAD_REQUESTS = "friends/loadRequests";

const addFriendship = (friend_id, self_id) => {
  return {
    type: ADD_FRIENDSHIP,
    payload: { friend_id, self_id },
  };
};

const addFriendRequest = (friend_id, self_id) => {
  return {
    type: ADD_FRIEND_REQUEST,
    payload: { friend_id, self_id },
  };
};

const loadFriends = (friends) => {
  return {
    type: LOAD_FRIENDS,
    payload: friends,
  };
};

const loadRequests = (requests) => {
  return {
    type: LOAD_REQUESTS,
    payload: requests,
  };
};

export const createFriendRequest = (payload) => async (dispatch) => {
  const { self_id, friend_username } = payload;
  const f = new FormData();
  f.append("self_id", self_id);
  f.append("friend_username", friend_username);

  const [response] = await Promise.all([
    fetch(`/api/friendships/`, {
      method: "POST",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addFriendRequest(data));
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

export const createFriendship = (payload) => async (dispatch) => {
  const { self_id, friend_username } = payload;

  const [response] = await Promise.all([
    fetch(`/api/friendships/${self_id}/${friend_username}`, {
      method: "POST",
    }),
  ]);

  // console.log(response);
  if (response.ok) {
    const data = await response.json();
    dispatch(addFriendship(data));
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

const friendReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FRIENDSHIP:
      return {
        ...state,
        friendships: { [action.payload.self_id]: action.payload.friend_id },
      };
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        requests: {
          [action.payload.id]: [
            action.payload.self_id,
            action.payload.friend_id,
          ],
        },
      };
    default: {
      return state;
    }
  }
};

export default friendReducer;
