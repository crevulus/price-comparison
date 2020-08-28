import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Chanti from "./assets/change-is-chanti.png";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import CookieConsent from "react-cookie-consent";
import Questions from "./components/Questions";
import Dropdown from "./components/Dropdown";

class App extends Component {
  state = {
    locationCode: "",
    answerCodes: [],
    locationNamesData: "",
    pricesData: "",
  };

  componentDidMount = () => {
    axios
      .get("https://changey.uber.space/company/changeis")
      .then((data) => {
        const companyData = data.data[0];
        const locationNamesData = Object.values(companyData)[1];
        this.setState({
          locationNamesData: locationNamesData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDropdownSubmit = (code) => {
    this.setState({
      locationCode: code,
    });
    axios
      .get(`https://changey.uber.space/prices/${code}`)
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };

  handleAnswersUpdate = (codes) => {
    let newPricesData = [];
    // send call to prices aPI in here
    if (codes) {
      axios
        .post(`https://changey.uber.space/prices/${this.state.locationCode}`, {
          answer: codes,
        })
        .then((data) => {
          data.data.forEach((item) => newPricesData.push(item));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(newPricesData);
    this.setState({ pricesData: newPricesData });
  };

  render() {
    let appContent = this.state.locationNamesData ? (
      <div className="App">
        <Navbar />
        <div className="spacing-div-navbar-content" />
        <SidePanel
          answerCodes={this.state.answerCodes}
          pricesData={this.state.pricesData}
        />
        <div className="background-rec">
          <div className="welcome-container">
            <div className="welcome-text">
              <h2>Costs Calculator</h2>
              <h4>Affordability</h4>
              <div className="welcome-line"></div>
              <p>
                <strong>
                  Three simple steps to calculate your monthly expenses:
                </strong>
              </p>
              <ol>
                <li>
                  Choose your location and compare energy providers for your
                  base monthly costs
                </li>
                <li>See what that would cost you elsewhere</li>
                <li>
                  Add extra options to take full advantage of Change= networked
                  living
                </li>
              </ol>
            </div>
            <div className="welcome-image">
              <img src={Chanti} alt="Chanti" />
            </div>
          </div>
        </div>
        <div className="questions-container">
          <Dropdown
            locationNames={this.state.locationNamesData}
            onDropdownSubmit={this.handleDropdownSubmit}
          />
          <Questions
            onChildUpdate={this.handleAnswersUpdate}
            locationCode={this.state.locationCode}
          />
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
