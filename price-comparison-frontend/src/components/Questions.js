import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";
import data from "../react-dummy_ZO_questions.json";

export class Questions extends Component {
  state = {
    questions: "",
    questionBlocks: "",
    answerCodes: [],
  };

  componentWillMount = () => {
    const AxiosConfig = {
      withCredentials: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    axios
      .get("https://changey.uber.space/questions/changeis/chzo", AxiosConfig)
      .then((data) => {
        this.setState({ questions: data.data[0] }, () =>
          console.log(this.state.questions)
        );
      });
  };

  handleChildClick = (code) => {
    console.log(code);
    if (this.state.answerCodes.includes(code)) {
      const index = this.state.answerCodes.indexOf(code);
      const newAnswerCodes = this.state.answerCodes.splice(index, 1);
      this.setState({ answerCodes: [...this.state.answerCodes] });
    } else {
      this.setState({ answerCodes: [...this.state.answerCodes, code] });
    }
  };

  render() {
    const questions = this.state.questions;
    let questionBlocks = Object.keys(questions).map((set) => {
      const answers = [];
      const answerCodes = [];
      console.log(questions[set]);
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
        console.log(error);
      }
    });
    return <div className="questions-container">{questionBlocks}</div>;
  }
}

export default Questions;
