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
              <div className="energy-button">
                <h3>{options[provider].titel}</h3>
                <img
                  className="energy-img"
                  src={options[provider].logo}
                  alt={options[provider].titel}
                />
                <p>{options[provider].price}</p>
                <input
                  type="radio"
                  name="energyRadio"
                  className="energy-radio"
                  onClick={() => this.handleClick(options[provider].answerCode)}
                />
              </div>
            );
          }
        }
      } catch (error) {
        console.log(error.name + ": " + error.message);
      }
    });
    return <form className="question-block energy-block">{energyOptions}</form>;
  }
}
