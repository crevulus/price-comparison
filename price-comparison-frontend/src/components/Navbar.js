import React from "react";
import { ReactComponent as Logo } from "../assets/ChangeLogo.svg";

export default function Navbar() {
  return (
    <div className="navbar">
      <button className="back-button">Back</button>
      <Logo className="logo" />
    </div>
  );
}
