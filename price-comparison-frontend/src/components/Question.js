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
      answerCodes: [],
      infoModalShow: false,
    };
  }

  createCheckboxes = () => this.props.answers.map(this.createCheckbox);

  createCheckbox = (option, i) => {
    return (
      <Checkbox
        label={option}
        isSelected={this.state.checkboxes[option]}
        onCheckboxChange={this.handleCheckboxChange}
        price={this.props.prices[i]}
        key={option}
        dbKey={this.props.answerCodes[i]}
        onClick={this.handleClick}
      />
    );
  };

  handleClick = (e) => {
    this.props.onChildClick(e.target.value);
  };

  handleCheckboxChange = (changeEvent) => {
    const { name } = changeEvent.target;

    this.setState((prevState) => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  };

  toggleInfo = () => {
    if (this.state.infoModalShow) {
      this.setState({ infoModalShow: false });
    } else {
      this.setState({ infoModalShow: true });
    }
  };

  // selectAll = () => this.selectAllCheckboxes(true);

  // selectAllCheckboxes = (isSelected) => {
  //   Object.keys(this.state.checkboxes).forEach((checkbox) => {
  //     this.setState((prevState) => ({
  //       checkboxes: {
  //         ...prevState.checkboxes,
  //         [checkbox]: isSelected,
  //       },
  //     }));
  //   });
  // };

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
        {this.props.question}
        <button onClick={this.toggleInfo} className="info">
          ?
        </button>
        {this.state.infoModalShow ? (
          <p className="info-text">{this.props.text}</p>
        ) : null}
        <form className="checkbox-form" onSubmit={this.handleFormSubmit}>
          {this.createCheckboxes()}
        </form>
      </div>
    );
  }
}

export default Question;
