import React, { Component } from "react";
import Question from "./Question";
import data from "../react-dummy_ZO_questions.json";

export class Questions extends Component {
  componentDidMount() {}

  renderQuestions = () => {};

  render() {
    const questions = JSON.parse(JSON.stringify(data));
    console.log(questions);
    let questionBlocks = Object.keys(questions).map((set) => {
      const answers = [];
      questions[set].answers.forEach((arr) => {
        answers.push(arr.answer);
      });
      // console.log(answers);
      // console.log(questions[set].question);
      return <Question question={questions[set].question} answers={answers} />; // not sure why it works but I ain't questionin' it.
    });
    return <div className="questions-container">{questionBlocks}</div>;
  }
}

export default Questions;
