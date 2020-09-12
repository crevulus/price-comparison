import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: "",
      questionBlocks: "",
      answerCodes: [],
      advancedText: "Advanced Options",
      showAdvanced: false,
    };

    this.handleChildClick = this.handleChildClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.locationCode !== prevState.locationCode) {
      return { locationCode: nextProps.locationCode };
    } else return null;
  }

  componentDidUpdate = (prevProps) => {
    this.props.onChildUpdate(this.state.answerCodes);
    if (prevProps.locationCode !== this.props.locationCode) {
      const AxiosConfig = {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      axios
        .get(
          `https://changey.uber.space/questions/changeis/${this.props.locationCode}`,
          AxiosConfig
        )
        .then((data) => {
          this.setState(
            { questions: data.data[0], answerCodes: [], showAdvanced: false },
            () => console.log(this.state.questions)
          );
        });
    }
  };

  handleChildClick = (code) => {
    if (this.state.answerCodes.includes(code)) {
      const index = this.state.answerCodes.indexOf(code);
      const newAnswerCodes = this.state.answerCodes.splice(index, 1);
      this.setState({ answerCodes: [...this.state.answerCodes] });
    } else {
      this.setState({ answerCodes: [...this.state.answerCodes, code] });
    }
  };

  toggleAdvanced = (e) => {
    e.preventDefault();
    if (this.state.showAdvanced === true) {
      this.setState((prevState) => ({
        showAdvanced: !prevState.showAdvanced,
      }));
    } else {
      this.setState((prevState) => ({
        showAdvanced: !prevState.showAdvanced,
      }));
    }
  };

  render() {
    const questions = this.state.questions;
    let questionBlocks = this.state.questions
      ? this.state.showAdvanced
        ? Object.keys(questions).map((set) => {
            const answers = [];
            const answerCodes = [];
            try {
              questions[set].answers.forEach((arr) => {
                answers.push(arr.answer);
              });
              questions[set].answers.forEach((arr) => {
                answerCodes.push(arr.answerCode);
              });
              return (
                <Question
                  question={questions[set].question} // not sure why it works but I ain't questionin' it.
                  answers={answers}
                  answerCodes={answerCodes}
                  explanation={questions[set].Text}
                  prices={questions[set].answers.map((answer) => answer.price)}
                  onChildClick={this.handleChildClick}
                />
              );
            } catch (error) {
              console.log(error.name + ": " + error.message);
            }
          })
        : Object.keys(questions).map((set) => {
            if (questions[set].advanced === false) {
              const answers = [];
              const answerCodes = [];
              try {
                questions[set].answers.forEach((arr) => {
                  answers.push(arr.answer);
                });
                questions[set].answers.forEach((arr) => {
                  answerCodes.push(arr.answerCode);
                });
                return (
                  <Question
                    question={questions[set].question} // not sure why it works but I ain't questionin' it.
                    answers={answers}
                    answerCodes={answerCodes}
                    prices={questions[set].answers.map(
                      (answer) => answer.price
                    )}
                    onChildClick={this.handleChildClick}
                  />
                );
              } catch (error) {
                console.log(error.name + ": " + error.message);
              }
            }
          })
      : null;
    return (
      <div>
        <div>{questionBlocks}</div>
        {this.state.showAdvanced ? (
          <button className="advanced-options" onClick={this.toggleAdvanced}>
            Hide Advanced Options
            <ExpandLessIcon />
          </button>
        ) : !this.state.showAdvanced && this.state.locationCode ? (
          <button className="advanced-options" onClick={this.toggleAdvanced}>
            Show Advanced Options
            <ExpandMoreIcon />
          </button>
        ) : null}
      </div>
    );
  }
}

export default Questions;
