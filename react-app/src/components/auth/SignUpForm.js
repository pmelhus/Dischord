import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import {LoadingModal} from "../../context/LoadingModal"

const SignUpForm = ({ socket }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [bio, setBio] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true)
  const [idle, setIdle] = useState(false)

  const onSignUp = async (e) => {
    e.preventDefault();
    await setLoading(true)
    const data = await dispatch(
      signUp(username, email, password, repeatPassword, image, bio, online, idle)
    );
    if (data.errors) {
      await setLoading(false)
      setErrors(data.errors);
    } else {
      await socket.emit("sign-up", data);
      await history.push("/channels/@me");
      await setLoading(false)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (user) {
    return <Redirect to="/channels/@me" />;
  }

  return (
    <div className="login-container">
            {loading && (
      <LoadingModal>
        <img
          id="loading-image"
          src="https://c.tenor.com/HJvqN2i4Zs4AAAAi/milk-and-mocha-cute.gif"
        />
      </LoadingModal>
          )}
      <form className="login-form" onSubmit={onSignUp}>
        <div className="login-welcome-message">
          <h2>Join our community!</h2>
          <p>Please provide your information below</p>
        </div>
        <div className="login-email">
          <label className="login-label">Username</label>
          {errors && errors.username && (
            <div className="error-msg">
              <p>*{errors.username}*</p>
            </div>
          )}
          <input
            className="login-input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="login-password">
          <label className="login-label">Email</label>
          {errors && errors.email && (
            <div className="error-msg">
              <p>*{errors.email}*</p>
            </div>
          )}
          <input
            className="login-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="login-email">
          <label className="login-label">Password</label>
          {errors && errors.password && (
            <div className="error-msg">
              <p>*{errors.password}*</p>
            </div>
          )}
          <input
            className="login-input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="login-email">
          <label className="login-label">Repeat Password</label>
          {errors && errors.repeatPassword && (
            <div className="error-msg">
              <p>*{errors.repeatPassword}*</p>
            </div>
          )}
          <input
            className="login-input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="login-email">
          <label className="login-label">Bio</label>
          {errors && errors.bio && (
            <div className="error-msg">
              <p>*{errors.bio}*</p>
            </div>
          )}
          <textarea
            className="login-input"
            name="bio"
            onChange={updateBio}
            value={bio}
          ></textarea>
        </div>
        {/* <label className="login-label">
          Upload a profile picture so other's can see you!
        </label>
        <div className="login-email">
          {errors && errors.image_file && (
            <div className="error-msg">
              <p>*{errors.image_file}*</p>
            </div>
          )}
          <input
            className="login-input"
            draggable="false"
            type="file"
            accept="image/png, image/jpeg, image/png, image/gif"
            name="image"
            onChange={updateImage}
          ></input>
        </div> */}
        <div className="login-password">
          <button className="signup-login-button" type="submit">Sign-up!</button>
        </div>
        <div className="login-register">
          <p>Already have an account?</p>
          <Link to="/login">
            <p id="login-register">Sign-in</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
