import React, { Component } from "react";

// let code = "",

export default class Energy extends Component {
  handleClick = (code) => {
    this.props.onChildClick(code);
  };

  render() {
    const options = this.props.data[0];
    let energyOptions = Object.keys(options).map((provider) => {
      try {
        {
          if (options[provider].titel) {
            return (
              <button
                onClick={() => this.handleClick(options[provider].answerCode)}
              >
                <h3>{options[provider].titel}</h3>
                <img
                  src={options[provider].logo}
                  alt={options[provider].titel}
                />
                <p>{options[provider].price}</p>
              </button>
            );
          }
        }
      } catch (error) {
        console.log(error.name + ": " + error.message);
      }
    });
    return <div className="question-block">{energyOptions}</div>;
  }
}
