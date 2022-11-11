import React, { Component } from "react";

export default class Energy extends Component {
  handleClick = (code) => {
    this.props.onChildClick(code);
  };

  render() {
    const options = this.props.data[0];
    let energyOptions = Object.keys(options).map((provider, i) => {
      try {
        {
          if (options[provider].titel) {
            return (
              <label key={i} className="energy-button">
                <div>
                  <img
                    className="energy-img"
                    src={options[provider].logo}
                    alt={options[provider].titel}
                    title={options[provider].titel}
                  />
                  <p className="energy-price">€{options[provider].price}</p>
                  <br />
                  <input
                    id={i}
                    type="radio"
                    name="energyRadio"
                    className="energy-radio"
                    onClick={() =>
                      this.handleClick(options[provider].answerCode)
                    }
                  />
                </div>
              </label>
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
