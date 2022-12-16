// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_USER_PROFILE = "session/SET_USER_PROFILE";
const SET_USER_PASSWORD = "session/SET_USER_PASSWORD";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const setUserProfile = (user) => ({
  type: SET_USER_PROFILE,
  payload: user,
});

const setUserPassword = (user) => ({
  type: SET_USER_PASSWORD,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  // console.log(response, 'RESPONSE HERE')

  if (response.ok) {
    const data = await response.json();
    // console.log(data, 'DATA HERE')
    dispatch(setUser(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      let errorObj = {};
      data?.errors.forEach((error) => {
        let key = error.split(":")[0];
        errorObj[key] = error.split(":")[1];
      });
      return { errors: errorObj };
    } else {
      return { errors: "An error occurred. Please try again." };
    }
  } else {
    return { errors: "An error occurred. Please try again." };
  }
};

export const logout = (id) => async (dispatch) => {
  console.log(id);
  const response = await fetch(`/api/auth/logout/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeUser());
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

export const signUp =
  (username, email, password, repeatPassword, image, bio) =>
  async (dispatch) => {
    const f = new FormData();
    f.append("username", username);
    f.append("email", email);
    f.append("password", password);
    f.append("confirm_password", repeatPassword);
    f.append("bio", bio);
    if (image) {
      // console.log(image);
      f.append("image", image);
    }
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: f,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        console.log(data.errors, "HERE");
        // console.log(data.errors)
        let errorObj = {};
        data.errors.forEach((error) => {
          let key = error.split(":")[0];
          errorObj[key] = error.split(":")[1];
        });
        return { errors: errorObj };
      } else {
        return { errors: "An error occurred. Please try again." };
      }
    }
  };

export const editUserProfile = (data) => async (dispatch) => {
  // console.log("------------editcharterTHUNK");
  // console.log(data)
  // console.log("------------editcharterTHUNK");
  const { id, username, email, bio, image } = data;
  // console.log(data, '======================data')

  const f = new FormData();

  f.append("id", id);
  f.append("username", username);
  f.append("email", email);
  f.append("bio", bio);

  if (image) {
    f.append("image", image);
  }

  const [response] = await Promise.all([
    fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(setUserProfile(data));
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
    } else {
      return { errors: "An error occurred. Please try again." };
    }
  } else {
    return { errors: "An error occurred. Please try again." };
  }
};

export const editUserPassword = (data) => async (dispatch) => {
  const { id, newPassword, newPasswordConfirm, currentPassword } = data;

  const f = new FormData();
  f.append("id", id);
  f.append("password", newPassword);
  f.append("confirm_password", newPasswordConfirm);
  f.append("current_password", currentPassword);

  const [response] = await Promise.all([
    fetch(`/api/users/password/${id}`, {
      method: "PATCH",
      body: f,
    }),
  ]);

  if (response.ok) {
    const data = await response.json();
    dispatch(setUserPassword(data));
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload, "PAYLOAD");
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case SET_USER_PROFILE:
      return { user: action.payload };
    case SET_USER_PASSWORD:
      return { user: action.payload };

    default:
      return state;
  }
}
