import React from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
  return (
    <nav className="splash-nav">
      <div>
        <NavLink to="/" exact={true} activeClassName="active">
          <h3>Logo</h3>
        </NavLink>
      </div>
      <ul className="splash-nav-ul">
        <li>Paul Melhus</li>
        <li>
          <a href="https://www.linkedin.com/feed/">LinkedIn</a>
        </li>
        <li>
        <a href="https://github.com/pmelhus">GitHub</a>
        </li>
      </ul>
      <div className="splash-sign-in">
        <NavLink to="/register" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
