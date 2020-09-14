import React, { Component } from "react";
import "../../App.css";

export default class ExplanationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesData: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pricesData !== prevState.pricesData) {
      return { pricesData: nextProps.pricesData };
    } else {
      return null;
    }
  }

  componentDidUpdate = () => {
    this.renderExp();
    console.log(this.state.pricesData);
  };

  renderExp = () => {
    this.props.pricesData.forEach((set) => console.log(set));
  };

  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="cookie-modal">
        <div>{this.state.pricesData.length}</div>
        <button onClick={this.onClose}>Close</button>
      </div>
    );
  }
}
