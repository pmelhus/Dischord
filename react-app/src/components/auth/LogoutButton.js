import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

const LogoutButton = ({ socket }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    const logout = await dispatch(logout());
    await socket.emit("logout", logout);
    await history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
