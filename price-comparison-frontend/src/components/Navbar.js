import React from "react";

import { ReactComponent as Logo } from "../assets/ChangeLogo.svg";
import verloop from "../assets/verloop-01.png";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="verloop-container">
        <img className="verloop" src={verloop} alt="verloop" />
      </div>
      <div className="navbar-contents">
        <Logo className="logo" />
        <div className="navbar-buttons">
          <a href="https://www.change-is.com/" className="back-link">
            <button className="back-button">GO BACK</button>
          </a>
          <button className="login-button" disabled>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
