import React, { Component } from "react";
import "../../App.css";

export default class ErrorModal extends Component {
  onRefresh = () => {
    this.props.handleError();
  };

  render() {
    return (
      <div className="modal">
        <h3>
          Something went wrong! Hit refresh to reload the page and we'll try
          that one more time.
        </h3>
        <p>
          If you continue to see this error warning, please contact
          info@pro-evo.nl.
        </p>
        <div className="btn-container">
          <button className="submit" onClick={this.onRefresh}>
            Refresh
          </button>
        </div>
      </div>
    );
  }
}
