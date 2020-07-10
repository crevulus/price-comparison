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
      <CookieConsent
        enableDeclineButton
        buttonText="Accept"
        buttonStyle={{ backgroundColor: "#009785", color: "white" }}
        declineButtonText="Reject"
        declineButtonStyle={{
          backgroundColor: "#FFC749",
          color: "#000000",
        }}
        overlay
      >
        This website uses cookies to enhance user experience. Cookies will be
        used for analytics, personalised content, and third-party tracking.
      </CookieConsent>
    </div>
  );
}

export default App;
