import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/@me"/>;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onLogin}>
        <div className="login-welcome-message">
          <h2>Welcome back!</h2>
          <p>We're so excited to see you again!</p>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login-email">
          <label className='login-label' htmlFor="email">Email</label>
          <input
          className='login-input'
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-password">
          <label className='login-label' htmlFor="password">Password</label>
          <input
          className="login-input"
            id="login-input-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        <button type="submit">Login</button>
        </div>
        <div className="login-register">
          <p>Need an account?</p>
          <Link to="/register">
            <p id="login-register">Register</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
