import React, { Component } from "react";
import Checkbox from "./Checkbox";
import "../App.css";

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: props.answers.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
    };
  }

  createCheckboxes = () => this.props.answers.map(this.createCheckbox);

  createCheckbox = (option) => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  selectAll = () => this.selectAllCheckboxes(true);

  selectAllCheckboxes = (isSelected) => {
    Object.keys(this.state.checkboxes).forEach((checkbox) => {
      this.setState((prevState) => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected,
        },
      }));
    });
  };

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    Object.keys(this.state.checkboxes)
      .filter((checkbox) => this.state.checkboxes[checkbox])
      .forEach((checkbox) => {
        console.log(checkbox, "is selected.");
      });
  };

  render() {
    return (
      <div className="question-block">
        <form onSubmit={this.handleFormSubmit}>
          {this.createCheckboxes()}
          <div>
            <button type="button" onClick={this.selectAll}>
              Select All
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Question;
