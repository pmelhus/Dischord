const ADD_INBOX = "inboxes/addInbox";


const addInbox = (inbox) => {
  return {
    type: ADD_INBOX,
    payload: inbox,
  };
};


export const createInbox = (payload) => async (dispatch) => {
  const { self_id, friend_id } = payload;
  // console.log('test')
  const f = new FormData()

  f.append("self_id", self_id)
  f.append('friend_id', friend_id)

  const [response] = await Promise.all([
    fetch(`/api/inboxes/`, {
      method: "POST",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addInbox(data));
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

export const addInboxMembers = (payload) => async (dispatch) => {
  const { self_id, friend_id, inbox_id } = payload;
  // console.log('test')
  const f = new FormData()

  f.append("self_id", self_id)
  f.append('friend_id', friend_id)
  f.append('inbox_id', inbox_id)

  const [response] = await Promise.all([
    fetch(`/api/inboxes/add_members`, {
      method: "POST",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(addInbox(data));
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

const inboxReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_INBOX:
      return {
        ...state,
        [action.payload.id]: {
          members: {
            self_id: action.payload.self_id,
            friend_id: action.payload.friend_id,
          },
        },
      };
    default: {
      return state;
    }
  }
};

export default inboxReducer;
