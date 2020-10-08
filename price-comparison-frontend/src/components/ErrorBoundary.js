import React, { Component } from "react";
import "../App.css";
import ErrorModal from "./Modals/ErrorModal";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch = () => {
    // Display fallback UI
    this.setState({ hasError: true });
  };

  handleErrorModal = () => {
    this.setState({
      hasError: false, // need [] syntax to use param as prop in state
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorModal handleError={this.handleErrorModal} />;
    }
    return this.props.children;
  }
}
