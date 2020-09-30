import React, { Component } from "react";

export default class Energy extends Component {
  render() {
    const options = this.props.data[0];
    let energyOptions = Object.keys(options).map((provider) => {
      try {
        return <div>{options[provider].titel}</div>;
      } catch (error) {
        console.log(error.name + ": " + error.message);
      }
    });
    return <div className="question-block">{energyOptions}</div>;
  }
}
