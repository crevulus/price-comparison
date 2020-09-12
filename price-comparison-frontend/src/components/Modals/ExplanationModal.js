import React, { Component } from "react";
import "../../App.css";

export default class ExplanationModal extends Component {
  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="cookie-modal">
        <p>This is the expplanation for various costs.</p>
        <button onClick={this.onClose}>Close</button>
      </div>
    );
  }
}
