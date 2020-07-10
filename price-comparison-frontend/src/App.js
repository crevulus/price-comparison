import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SidePanel />
      <CookieConsent />
    </div>
  );
}

export default App;
