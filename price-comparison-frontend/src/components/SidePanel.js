import React, { Component } from "react";
import Graph from "./Graph";
import dummyData from "../react-dummy_form_answer.json";

export class SidePanel extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log(dummyData);
  }

  callback = (graphData) => {
    console.log(graphData);
  };

  updateChart = (chart, label, data) => {};

  handleClick = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="sidenav" data={dummyData}>
        <Graph />
        <button onClick={this.handleClick()}>Update</button>
      </div>
    );
  }
}

export default SidePanel;
