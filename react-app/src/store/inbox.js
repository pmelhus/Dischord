const ADD_INBOX = "inboxes/addInbox";
const GET_INBOX = "inboxes/getInbox";
const GET_ALL_INBOXES = 'inboxes/getAllInboxes'
const ADD_INBOX_MEMBERS = 'inboxes/addInboxMembers'

const addInbox = (inbox) => {
  return {
    type: ADD_INBOX,
    payload: inbox,
  };
};

const getInbox = (inbox) => {
  return {
    type: GET_INBOX,
    payload: inbox,
  };
};

const getAllInboxes = (inboxes) => {
  return {
    type: GET_ALL_INBOXES,
    payload: inboxes
  }
}

const addAllInboxMembers = (data) => {
  return {
    type: ADD_INBOX_MEMBERS,
    payload: data
  }
}

export const createInbox = (payload) => async (dispatch) => {
  const { self_id, friend_id } = payload;
  // console.log('test')
  const f = new FormData();

  f.append("self_id", self_id);
  f.append("friend_id", friend_id);

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
  const f = new FormData();

  f.append("self_id", self_id);
  f.append("friend_id", friend_id);
  f.append("inbox_id", inbox_id);

  const [response] = await Promise.all([
    fetch(`/api/inboxes/add_members`, {
      method: "POST",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();

    dispatch(addAllInboxMembers(data));
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

export const getOneInbox = (payload) => async (dispatch) => {
  const { self_id, friend_id } = payload;

  const [response] = await Promise.all([
    fetch(`/api/inboxes/get_one/${self_id}/${friend_id}`),
  ]);


  if (response.ok) {
    const data = await response.json();
    dispatch(getInbox(data.inbox));
    return data.inbox;
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

export const getInboxes = (id) => async (dispatch) => {



  const [response] = await Promise.all([
    fetch(`/api/inboxes/get_all/${id}`),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllInboxes(data));
    return data.inboxes;
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
        [action.payload.inbox.id]: action.payload.inbox,
      };
    case GET_INBOX:
      console.log(action.payload, 'BOX')
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
      case GET_ALL_INBOXES:
        const inboxData = {}
       if (action.payload.errors) return {...state}
        action.payload.inboxes.forEach((inbox) => {
          inboxData[inbox.id] = inbox
        })
        return {
          ...inboxData
        };
        case ADD_INBOX_MEMBERS:
          return {
            ...state, [action.payload.inbox.id]: action.payload.inbox
          }
    default: {
      return state;
    }
  }
};

export default inboxReducer;
