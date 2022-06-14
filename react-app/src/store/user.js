const LOAD_USERS = "users/loadUsers";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  payload: users
});

export const genUsers = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [usersResponse] = await Promise.all([fetch(`/api/users/`)]);
  const [users] = await Promise.all([usersResponse.json()]);

  if (usersResponse.ok) {
    dispatch(loadUsers(users.users));
    return users;
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
