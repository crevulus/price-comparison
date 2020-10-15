import React from "react";

import { ReactComponent as Logo } from "../assets/ChangeLogo.svg";
import verloop from "../assets/verloop-01.png";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="verloop-container">
        <img className="verloop" src={verloop} alt="verloop" />
      </div>
      <div className="navbar-contents">
        <a href="https://www.change-is.com/" className="back-link">
          <button className="back-button">
            <ArrowBackIcon />
            <p className="back-text">Back</p>
          </button>
        </a>
        <Logo className="logo" />
      </div>
    </div>
  );
}
