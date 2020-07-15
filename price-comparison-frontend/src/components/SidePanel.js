import React, { Component } from "react";
import Graph from "./Graph";

export class SidePanel extends Component {
  render() {
    return (
      <div className="sidenav">
        <Graph />
      </div>
    );
  }
}

export default SidePanel;
