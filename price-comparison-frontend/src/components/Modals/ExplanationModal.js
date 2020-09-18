import React, { Component } from "react";

import "../../App.css";

let explanations = [];

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

  // to allow for async rendering
  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.pricesData !== this.state.pricesData) {
      return this.state.pricesData;
    }
  }

  componentDidUpdate = (prevData) => {
    this.renderExp(prevData.pricesData);
  };

  renderExp = (data) => {
    explanations = [];
    data.forEach((set) => explanations.push(set.explenation));
  };

  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="modal">
        <div>{explanations}</div>
        <button onClick={this.onClose} className="update">
          Close
        </button>
      </div>
    );
  }
}
