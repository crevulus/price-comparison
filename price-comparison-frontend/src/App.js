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

  componentDidMount = () => {
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
    let appContent = this.state.locationNamesData ? (
      <div className="App">
        <Navbar />
        <SidePanel answerCodes={this.state.answerCodes} />
        <div className="questions-container">
          <div className="question-block">Intro text</div>
          <Dropdown locationNames={this.state.locationNamesData} />
          <Questions onChildUpdate={this.handleChildUpdate} />
        </div>
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
    ) : (
      "Loading..."
    );
    return appContent;
  }
}

export default App;
