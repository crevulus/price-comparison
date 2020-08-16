import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";

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
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.locationCode !== prevState.locationCode) {
      return { locationCode: nextProps.locatiionCode };
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
    console.log("Update chart here " + code);
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
        // advancedText: "Hide Options",
        showAdvanced: !prevState.showAdvanced,
      }));
    } else {
      this.setState((prevState) => ({
        // advancedText: "Advanced Options",
        showAdvanced: !prevState.showAdvanced,
      }));
    }
  };

  // returnQuestions = () => {
  //   const questions = this.state.questions;
  //   Object.keys(questions).map((set) => {
  //     const answers = [];
  //     const answerCodes = [];
  //     try {
  //       questions[set].answers.forEach((arr) => {
  //         answers.push(arr.answer);
  //       });
  //       questions[set].answers.forEach((arr) => {
  //         answerCodes.push(arr.answerCode);
  //       });
  //       return (
  //         <Question
  //           question={questions[set].question} // not sure why it works but I ain't questionin' it.
  //           answers={answers}
  //           answerCodes={answerCodes}
  //           onChildClick={this.handleChildClick}
  //         />
  //       );
  //     } catch (error) {
  //       console.log(error.name + ": " + error.message);
  //     }
  //   });
  // };

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
        <button onClick={this.toggleAdvanced}>{this.state.advancedText}</button>
      </div>
    );
  }
}

export default Questions;
