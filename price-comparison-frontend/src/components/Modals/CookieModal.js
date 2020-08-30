import React, { Component } from "react";

export default class CookieModal extends Component {
  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div>
        <p>Hello Modal</p>
        <button onClick={this.onClose}>Close</button>
      </div>
    );
  }
}
