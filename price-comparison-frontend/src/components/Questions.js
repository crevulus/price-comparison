import React, { Component } from "react";
import Question from "./Question";

const questions = [
  {
    question: "What is love?",
    answers: ["a", "b", "c"],
  },
  {
    question: "Baby don't hurt me",
    answers: ["a", "b", "c", "d", "e"],
  },
  {
    question: "Don't hurt me no more",
    answers: ["a", "b"],
  },
];

export class Questions extends Component {
  render() {
    let questionBlocks = questions.map((data) => (
      <Question question={data.question} />
    ));
    let answerBlocks = questions.map((data) => <div>{data.answers}</div>);
    return <div>{questionBlocks}</div>;
  }
}

export default Questions;
