import React from "react";
import { ReactComponent as Logo } from "../assets/ChangeLogo.svg";
import verloop from "../assets/verloop-01.png";

export default function Navbar() {
  return (
    <div>
      <img className="verloop" src={verloop} alt="verloop" />
      <div className="navbar-contents">
        <button className="back-button">Back</button>
        <Logo className="logo" />
      </div>
    </div>
  );
}
