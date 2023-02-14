const ADD_FRIENDSHIP = "friends/addFriendship";
const ADD_FRIEND_REQUEST = "friends/addFriendRequest";
const LOAD_FRIENDS = "friends/loadFriends";
const LOAD_REQUESTS = "friends/loadRequests";
const DELETE_REQUEST = "friends/deleteRequest";

const addFriendship = (friendship) => {
  return {
    type: ADD_FRIENDSHIP,
    payload: friendship,
  };
};

const addFriendRequest = (request) => {
  return {
    type: ADD_FRIEND_REQUEST,
    payload: request,
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

const deleteRequest = (request) => {
  return {
    type: DELETE_REQUEST,
    payload: request,
  };
};

export const createFriendRequest = (payload) => async (dispatch) => {
  const { self_id, friend_username } = payload;
  const f = new FormData();
  f.append("self_id", self_id);
  f.append("friend_username", friend_username);

  const [response] = await Promise.all([
    fetch(`/api/friendships/requests/`, {
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
  const { self_id, friend_id } = payload;

  const f = new FormData

  f.append("self_id", self_id)
  f.append('friend_id', friend_id)

  const [response] = await Promise.all([
    fetch(`/api/friendships/`, {
      method: "POST",
      body: f
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

export const loadAllRequests = (id) => async (dispatch) => {
  console.log(id)
  const [response] = await Promise.all([
    fetch(`/api/friendships/requests/${id}`),
  ]);

  const [requests] = await Promise.all([response.json()]);

  if (response.ok) {
    dispatch(loadRequests(requests.requests));
    return requests;
  }
};

export const removeRequest = (id) => async (dispatch) => {
  const [response] = await Promise.all([
    fetch(`/api/friendships/requests/${id}`, { method: "DELETE" }),
  ]);
  const [request] = await Promise.all([response.json()]);

  if (response.ok) {
    console.log(request)
    dispatch(deleteRequest(request));
    return request;
  }
};

const friendReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FRIENDSHIP:
      return {
        ...state,
        friendships: { [action.payload.id]: [action.payload.friend_id, action.payload.self_id]},
      };
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        request: {
          [action.payload.id]: {
            ...action.payload.self_id,
            ...action.payload.friend_id,
          },
        },
      };

    case LOAD_REQUESTS:
      const requestsObj = {};
      const requestsArr = []

      for (let request of action.payload) {

       requestsArr.push( requestsObj[request.id] = request);
      }
      return {
        ...state,
        requests: requestsObj
      };

    case DELETE_REQUEST:
      console.log(action.payload)
      const newState = { ...state };
      delete newState["requests"][action.payload.id];
      return newState
    default: {
      return state;
    }
  }
};

export default friendReducer;
