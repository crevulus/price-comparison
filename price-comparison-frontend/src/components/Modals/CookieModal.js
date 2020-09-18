import React, { Component } from "react";
import "../../App.css";

export default class CookieModal extends Component {
  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="modal">
        <p>
          Unfortunately, users who do not accept cookies are unable to use this
          website.
        </p>
        <button className="submit" onClick={this.onClose}>
          Accept
        </button>
        <a href="https://www.change-is.com/">
          <button className="update">Back to Home</button>
        </a>
      </div>
    );
  }
}
