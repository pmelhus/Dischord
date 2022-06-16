const LOAD_USERS = "users/loadUsers";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  payload: users
});

export const genUsers = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [response] = await Promise.all([fetch(`/api/users/`)]);
  const [users] = await Promise.all([response.json()]);

  if (response.ok) {
    dispatch(loadUsers(users.users));
    return users;
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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USERS:
      const usersData = {};
      for (let user of action.payload) {
        usersData[user.id] = user;
      }
      return { ...usersData };
    default:
      return state;
  }
}

export default userReducer
