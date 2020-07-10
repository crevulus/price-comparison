import React from "react";

export default function Question(props) {
  return (
    <div className="question-block">
      <h3 className="question-text">{props.question}</h3>
      <ul className="answers-list">
        {props.answers.map((answer, i) => (
          <li className="answer-and-check" key={i}>
            <input
              type="checkbox"
              id={`answer_${i}`}
              className="answer-checkbox"
            />
            <label for={`answer_${i}`} className="answer-label">
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
