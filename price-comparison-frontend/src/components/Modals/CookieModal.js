import React, { Component } from "react";
import "../../App.css";

export default class CookieModal extends Component {
  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="cookie-modal">
        <p>
          Unfortunately, users who do not accept cookies are unable to use this
          website.
        </p>
        <button onClick={this.onClose}>Accept</button>
        <a href="https://www.google.com">
          <button>Back</button>
        </a>
      </div>
    );
  }
}
