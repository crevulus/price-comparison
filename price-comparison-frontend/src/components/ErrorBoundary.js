import React, { Component } from "react";
import RollbarErrorTracking from "./Rollbar";

import "../App.css";
import ErrorModal from "./Modals/ErrorModal";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch = (error) => {
    // Display fallback UI
    this.setState({ hasError: true });
    RollbarErrorTracking.logErrorInRollbar(error);
  };

  handleErrorModal = () => {
    this.setState({
      hasError: false,
    });
    console.log(Date.now() + ": " + navigator.userAgent);
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorModal handleError={this.handleErrorModal} />;
    }
    return this.props.children;
  }
}
