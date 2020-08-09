import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";
import data from "../react-dummy_ZO_questions.json";

export class Questions extends Component {
  state = {
    questions: "",
    questionBlocks: "",
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

  renderQuestions = () => {};

  // render() {
  //   const questions = this.state.questions;
  //   let questionBlocks = Object.keys(questions).map((set) => {
  //     const answers = [];
  //     const answerCodes = [];
  //     questions[set].answers.forEach((arr) => {
  //       answers.push(arr.answer);
  //     });
  //     questions[set].answers.forEach((arr) => {
  //       answerCodes.push(arr.answerCode);
  //     });
  //     return (
  //       <Question
  //         question={questions[set].question} // not sure why it works but I ain't questionin' it.
  //         answers={answers}
  //         answerCodes={answerCodes}
  //       />
  //     );
  //   });
  //   return <div className="questions-container">{questionBlocks}</div>;
  // }

  render() {
    // const questions = this.state.questions;
    // let questionBlocks = Object.keys(questions[0]).map((set) => {
    //   const answers = [];
    //   const answerCodes = [];
    //   questions[set].answers.forEach((arr) => {
    //     answers.push(arr.answer);
    //   });
    //   questions[set].answers.forEach((arr) => {
    //     answerCodes.push(arr.answerCode);
    //   });
    //   return (
    //     <Question
    //       question={questions[set].question} // not sure why it works but I ain't questionin' it.
    //       answers={answers}
    //       answerCodes={answerCodes}
    //     />
    //   );
    // });
    // return <div>{questionBlocks}</div>;
    return (
      <div>{Object.keys(this.state.questions).map((question) => question)}</div>
    );
  }
}

export default Questions;
