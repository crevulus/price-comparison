import React, { Component } from "react";
import "../../App.css";

export default class ExplanationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesData: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pricesData !== prevState.pricesData) {
      return { pricesData: nextProps.pricesData };
    } else {
      return null;
    }
  }

  componentDidUpdate = () => {
    this.renderExp();
    console.log(this.state.pricesData);
  };

  renderExp = () => {
    this.props.pricesData.forEach((set) => console.log(set));
  };

  onClose = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div className="modal">
        <div>
          <h3>Rent</h3>
          <p>Rent is calculated by x.</p>
          <h3>Water</h3>
          <p>Water is calculated by y.</p>
          <h3>Service Costs</h3>
          <p>Service Costs are calculated by z.</p>
        </div>
        <button className="update" onClick={this.onClose}>
          Close
        </button>
      </div>
    );
  }
}
