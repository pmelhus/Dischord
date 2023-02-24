const ADD_FRIENDSHIP = "friends/addFriendship";
const ADD_FRIEND_REQUEST = "friends/addFriendRequest";
const LOAD_FRIENDS = "friends/loadFriends";
const LOAD_REQUESTS = "friends/loadRequests";
const DELETE_REQUEST = "friends/deleteRequest";
const LOAD_MUTUAL_FRIENDS = "friends/loadMutuals";

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

const loadMutuals = (friends) => {
  return {
    type: LOAD_MUTUAL_FRIENDS,
    payload: friends,
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

  const f = new FormData();

  f.append("self_id", self_id);
  f.append("friend_id", friend_id);

  const [response] = await Promise.all([
    fetch(`/api/friendships/`, {
      method: "POST",
      body: f,
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
  const [response] = await Promise.all([
    fetch(`/api/friendships/requests/${id}`),
  ]);

  const [requests] = await Promise.all([response.json()]);

  if (response.ok) {
    dispatch(loadRequests(requests.requests));
    return requests;
  }
};

export const loadAllFriends = (id) => async (dispatch) => {
  const [response] = await Promise.all([fetch(`/api/friendships/${id}`)]);

  const [friends] = await Promise.all([response.json()]);

  if (response.ok) {
    dispatch(loadFriends(friends.friends));
    return friends;
  }
};

export const removeRequest = (id) => async (dispatch) => {
  const [response] = await Promise.all([
    fetch(`/api/friendships/requests/${id}`, { method: "DELETE" }),
  ]);
  const [request] = await Promise.all([response.json()]);

  if (response.ok) {
    console.log(request);
    dispatch(deleteRequest(request));
    return request;
  }
};

export const loadMutualFriends = (id) => async (dispatch) => {
  const [response] = await Promise.all([
    fetch(`/api/friendships/mutual_friends/${id}`),
  ]);
  console.log("HERE");
  const [users] = await Promise.all([response.json()]);

  if (response.ok) {
    dispatch(loadMutuals(users));
    return users;
  }
};

const friendReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FRIENDSHIP:
      return {
        ...state,
        friendships: {
          [action.payload.id]: [
            action.payload.friend_id,
            action.payload.self_id,
          ],
        },
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
      const requestsArr = [];

      for (let request of action.payload) {
        requestsArr.push((requestsObj[request.id] = request));
      }
      return {
        ...state,
        requests: requestsObj,
      };
    case LOAD_FRIENDS:
      const friendsObj = {};
      const friendsArr = [];

      for (let friend of action.payload) {
        friendsArr.push((friendsObj[friend.id] = friend));
      }
      return {
        ...state,
        friendships: friendsObj,
      };

    case LOAD_MUTUAL_FRIENDS:
      const mutualsObj = {};
      const mutualsArr = []

      const mutualFriendsObj = {};

      for (let user of action.payload.users) {
       mutualsArr.push( mutualsObj[user.id] = user)
      }
      for (let user of action.payload.mutual_friendships) {
        mutualFriendsObj[user.id] = user;
      }
      return {
        ...state,
        recommended: mutualsArr,
        mutualFriends: mutualFriendsObj,
      };

    case DELETE_REQUEST:
      console.log(action.payload);
      const newState = { ...state };
      delete newState["requests"][action.payload.id];
      return newState;
    default: {
      return state;
    }
  }
};

export default friendReducer;
