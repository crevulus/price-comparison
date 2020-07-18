import React, { Component } from "react";
import Question from "./Question";
import data from "../react-dummy_ZO_questions.json";

export class Questions extends Component {
  componentDidMount() {}

  renderQuestions = () => {};

  render() {
    const questions = JSON.parse(JSON.stringify(data));
    let questionBlocks = Object.keys(questions).map((set) => {
      const answers = [];
      const answerCodes = [];
      questions[set].answers.forEach((arr) => {
        answers.push(arr.answer);
      });
      questions[set].answers.forEach((arr) => {
        answerCodes.push(arr.answerCode);
      });
      // console.log(answers);
      // console.log(questions[set].question);

      return (
        <Question
          question={questions[set].question}
          answers={answers}
          answerCodes={answerCodes}
        />
      ); // not sure why it works but I ain't questionin' it.
    });
    return <div className="questions-container">{questionBlocks}</div>;
  }
}

export default Questions;
