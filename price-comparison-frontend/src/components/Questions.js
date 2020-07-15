import React, { Component } from "react";
import Question from "./Question";
import data from "../react-dummy_ZO_questions.json";

export class Questions extends Component {
  componentDidMount() {}

  renderQuestions = () => {};

  render() {
    const questions = JSON.parse(JSON.stringify(data));
    let questionBlocks = Object.keys(questions).map(
      (set) => (
        <Question
          question={questions[set].question}
          answers={questions[set].answers}
        />
      ) // not sure why it works but I ain't questionin' it.
    );
    return <div className="questions-container">{questionBlocks}</div>;
  }
}

export default Questions;
