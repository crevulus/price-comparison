import React, { Component } from "react";

import "../../App.css";

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
        <div className="exp-modal-text-container">
          {this.state.explanations.map((item, i) => (
            <span key={i}>
              <h4>{item.title}</h4>
              <p>{item.explanation}</p>
            </span>
          ))}
        </div>
        <button onClick={this.onClose} className="sticky-btn update">
          Close
        </button>
      </div>
    );
  }
}
