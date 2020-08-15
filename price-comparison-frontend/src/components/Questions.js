import React, { Component } from "react";
import Question from "./Question";
import axios from "axios";

export class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationCode: "",
      questions: "",
      questionBlocks: "",
      answerCodes: [],
    };
  }

  componentDidMount = () => {
    if (!this.props.locatiionCode) {
      return;
    } else {
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
          this.setState({ questions: data.data[0] }, () =>
            console.log(this.state.questions)
          );
        });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.locatiionCode !== prevState.locatiionCode) {
      return { locationCode: nextProps.locatiionCode };
    } else return null;
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (
  //     nextProps.locationCode &&
  //     nextProps.locationCode !== prevState.locationCode
  //   ) {
  //     const AxiosConfig = {
  //       withCredentials: false,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //       },
  //     };
  //     axios
  //       .get(
  //         `https://changey.uber.space/questions/changeis/${nextProps.locationCode}`,
  //         AxiosConfig
  //       )
  //       .then((data) => {
  //         const { questions } = data.data[0];
  //         return questions;
  //       });
  //   } else {
  //     return null;
  //   }
  // }

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
          this.setState({ questions: data.data[0] }, () =>
            console.log(this.state.questions)
          );
        });
    }
  };

  render() {
    const questions = this.state.questions;
    let questionBlocks = this.state.questions
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
      : "Loading...";
    return <div>{questionBlocks}</div>;
  }
}

export default Questions;
