import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

const LogoutButton = ({ socket }) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    e.preventDefault();
      await dispatch(logout(user.id));
      if (socket) {
    
        await socket.emit("logout", user);
      }
      await history.push("/");

  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
