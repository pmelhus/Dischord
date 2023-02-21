import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = ({ socket }) => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const history = useHistory();

  const idleTimer = (socket, id) => {
    // setTimeout(() => {
    //   socket?.emit('change_idle', id)
    // }, "3600000")
  }

  const onLogin = async (e) => {
    if (socket) {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      console.log(data, 'DATA')
      await socket.emit("login", data);
      if (data.errors) {
        setErrors(data.errors);
      } else {
        // console.log(data);
        // const jsonData= JSON.stringify(data)
        await history.push("/channels/@me");
      }
      await idleTimer(socket, data.id)
    }
  };

  const handleDemo = async (e) => {
    if (socket) {
      e.preventDefault();
      const data = await dispatch(login("the@listener.com", "password"));
      // console.log(data, "DATA HERER")
      await socket.emit("login", data);
      // console.log('I MADE IT')
      if (data?.errors) {
        setErrors(data?.errors);
      } else {
        // console.log(data);
        // const jsonData= JSON.stringify(data)
        await history.push("/channels/1/1");
      }
      await idleTimer(socket, data.id)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to="/channels/@me" />;
  // }
  console.log(errors);
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onLogin}>
        <div className="login-welcome-message">
          <h2>Welcome back!</h2>
          <p>We're so excited to see you again!</p>
        </div>

        <div className="login-email">
          <label className="login-label" htmlFor="email">
            Email
          </label>
          {errors && errors.email && (
            <div className="error-msg">
              <p>*{errors.email}*</p>
            </div>
          )}
          <input
            className="login-input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-password">
          <label className="login-label" htmlFor="password">
            Password
          </label>
          {errors && errors.password && (
            <div className="error-msg">
              <p>*{errors.password}*</p>
            </div>
          )}
          <input
            className="login-input"
            id="login-input-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button className="signup-login-button" type="submit">Login</button>
          <button className="signup-login-button" onClick={handleDemo} type="button">
            Demo Login
          </button>
        </div>
        <div className="login-register">
          <p>Need an account?</p>
          <Link to="/register">
            <p id="login-register">Sign-up</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
