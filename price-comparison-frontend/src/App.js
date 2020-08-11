import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import CookieConsent from "react-cookie-consent";
import Questions from "./components/Questions";
import Dropdown from "./components/Dropdown";

class App extends Component {
  state = {
    answerCodes: [],
    locationNamesData: "",
  };

  componentWillMount = () => {
    axios.get("https://changey.uber.space/company/changeis").then((data) => {
      const companyData = data.data[0];
      const locationNamesData = Object.values(companyData)[1];
      this.setState({
        locationNamesData: locationNamesData,
      });
    });
  };

  handleChildUpdate = (codes) => {
    console.log("updated " + codes);
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <SidePanel answerCodes={this.state.answerCodes} />
        <Dropdown locationNames={this.state.locationNamesData} />
        <Questions onChildUpdate={this.handleChildUpdate} />
        <CookieConsent
          style={{ alignItems: "center" }}
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
}

export default App;
