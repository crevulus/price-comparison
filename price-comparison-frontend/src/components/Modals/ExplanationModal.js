import React, { Component } from "react";

import "../../App.css";

// let explanations = [];

export default class ExplanationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesData: [],
      explanations: [],
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

  componentDidMount = () => {
    this.renderExp(this.state.pricesData);
  };

  renderExp = (data) => {
    let explanations = [];
    data.forEach((set) =>
      explanations.push({ title: set.titel, explanation: set.explenation })
    );
    this.setState({ explanations });
  };

  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="modal">
        <div>
          {this.state.explanations.map((item) => (
            <span>
              <h4>{item.title}</h4>
              <p>{item.explanation}</p>
            </span>
          ))}
        </div>
        <button onClick={this.onClose} className="update">
          Close
        </button>
      </div>
    );
  }
}
