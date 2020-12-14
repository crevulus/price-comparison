import React, { Component } from "react";

import "./App.css";

import axios from "axios";
import _ from "lodash";

import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import Questions from "./components/Questions";
import Dropdown from "./components/Dropdown";
import ExplanationModal from "./components/Modals/ExplanationModal";
import Footer from "./components/Footer";

import RollbarErrorTracking from "./components/Rollbar";
import ErrorModal from "./components/Modals/ErrorModal";
import ErrorBoundary from "./components/ErrorBoundary";

import ReactGA from "react-ga";
import Cookies from "js-cookie";
import CookieConsent from "react-cookie-consent";
import CookieModal from "./components/Modals/CookieModal";

class App extends Component {
  state = {
    locationCode: null,
    answerCodes: [],
    locationNamesData: "",
    pricesData: "",
    energyData: "",
    totalPrice: 0,
    cookieModalShow: false,
    expModalShow: false,
    hasError: false,
    cookieConsent: Cookies.get("CookieConsent"),
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
        RollbarErrorTracking.logErrorInRollbar(error);
      });
  };

  componentDidCatch = () => {
    this.setState({ hasError: true });
  };

  showModal = (modal) => {
    this.setState({
      [modal]: true, // need [] syntax to use param as prop in state
    });
  };

  hideModal = (modal) => {
    this.setState({
      [modal]: false, // need [] syntax to use param as prop in state
    });
  };

  handleDropdownSubmit = (code) => {
    this.setState({
      locationCode: code,
    });
    axios
      .get(`https://changey.uber.space/prices/${code}`)
      .then((data) => this.setState({ pricesData: data.data }))
      .catch((error) => {
        RollbarErrorTracking.logErrorInRollbar(error);
      });
    axios
      .get(`https://changey.uber.space/energy/changeis/${code}`)
      .then((data) => this.setState({ energyData: data.data }))
      .catch((error) => {
        RollbarErrorTracking.logErrorInRollbar(error);
      });
  };

  handleAnswersUpdate = (codes) => {
    let newPricesData = [];
    let newTotalPrice = 0;
    axios
      .post(`https://changey.uber.space/prices/${this.state.locationCode}`, {
        answer: codes,
      })
      .then((data) => {
        data.data.forEach((item) => {
          newPricesData.push(item);
        });
      })
      .catch((error) => {
        RollbarErrorTracking.logErrorInRollbar(error);
      });
    this.setState((prevState) => {
      if (_.isEqual(prevState.pricesData, newPricesData)) {
        return;
      } else {
        return {
          pricesData: newPricesData,
          totalPrice: newTotalPrice,
        };
      }
    });
  };

  handleErrorModal = () => {
    this.setState({
      hasError: false,
    });
    console.log(Date.now() + ": " + navigator.userAgent);
    window.location.reload();
  };

  setTrackingCookies = () => {
    Cookies.set("CookieConsent", "true");
    Cookies.set("CookieConsent-legacy", "true");
    ReactGA.initialize("UA-180490882-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.hotjarTracking();
  };

  hotjarTracking = () => {
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 2038710, hjsv: 6 };
      a = o.getElementsByTagName("head")[0];
      r = o.createElement("script");
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
  };

  render() {
    let appContent = this.state.locationNamesData ? (
      <div className="App">
        <ErrorBoundary>
          {this.state.cookieModalShow ? (
            <CookieModal
              hideModal={() => this.hideModal("cookieModalShow")}
              acceptCookies={this.setTrackingCookies}
            />
          ) : null}
          {this.state.expModalShow && this.state.locatonCode !== null ? (
            <ExplanationModal
              pricesData={this.state.pricesData}
              hideModal={() => this.hideModal("expModalShow")}
            />
          ) : null}
          <div
            className={
              this.state.cookieModalShow ||
              this.state.hasError ||
              (this.state.expModalShow && this.state.locationCode !== null)
                ? "modal-overlay"
                : ""
            }
          >
            <Navbar />
            <div className="spacing-div-navbar-content" />

            <div className="background-rec">
              <div className="welcome-container">
                <div className="welcome-text">
                  <h4 className="hook">Wat kan je je per maand veroorloven?</h4>
                  <h1>Bereken je kosten.</h1>
                  <p>
                    Bereken je maandelijkse kosten met behulp van drie simpele
                    stappen:
                  </p>
                  <ol>
                    <li className="welcome-list">Kies jouw voorkeursopties.</li>
                    <li className="welcome-list">
                      Vergelijk bij de goedkoopste concurrent.
                    </li>
                    <li className="welcome-list">
                      Voeg extra opties toe en update jouw tabel.
                    </li>
                  </ol>
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
                energyData={this.state.energyData}
              />
            </div>
            <SidePanel
              onClick={() => this.showModal("expModalShow")}
              answerCodes={this.state.answerCodes}
              pricesData={this.state.pricesData}
            />
            <CookieConsent
              style={{ alignItems: "center" }}
              enableDeclineButton
              onAccept={() => [this.setTrackingCookies()]}
              onDecline={() => {
                this.showModal("cookieModalShow");
              }}
              buttonText="Accept"
              buttonStyle={{ backgroundColor: "#009785", color: "white" }}
              declineButtonText="Reject"
              declineButtonStyle={{
                backgroundColor: "#FFC749",
                color: "#000000",
              }}
              overlay
            >
              This website uses cookies to enhance user experience. Cookies will
              be used for analytics, personalised content, and third-party
              tracking.
            </CookieConsent>
          </div>
        </ErrorBoundary>
        <Footer />
      </div>
    ) : this.state.errorMessage ? (
      <h3>
        {" "}
        <ErrorModal handleError={this.handleErrorModal} />{" "}
      </h3>
    ) : (
      "Loading..."
    );
    return appContent;
  }
}

export default App;
