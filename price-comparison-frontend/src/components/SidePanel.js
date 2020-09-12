import React, { Component } from "react";

import Chart from "chart.js";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExplanationModal from "./Modals/ExplanationModal";

let myChart;

export class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      pricesData: "",
      datasets: [],
      expModalShow: false,
    };
    this.chartRef = React.createRef();
  }

  showModal = (e) => {
    this.setState({
      expModalShow: true,
    });
  };

  hideModal = () => {
    this.setState({
      expModalShow: false,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pricesData !== prevState.pricesData) {
      return { pricesData: nextProps.pricesData };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate = () => {
    this.buildChart();
  };

  buildChart = () => {
    let datasets = [];
    if (this.state.pricesData) {
      this.state.pricesData.forEach((set) => {
        if (set.titel === "Competiors price") {
          let obj = {};
          obj.label = set.titel;
          obj.backgroundColor = set.color;
          obj.data = [0, set.price];
          obj.tooltip = set.tooltip;
          datasets.push(obj);
        } else {
          let obj = {};
          obj.label = set.titel;
          obj.backgroundColor = set.color;
          obj.data = [set.price, 0];
          obj.tooltip = set.tooltip;
          datasets.push(obj);
        }
      });
    }
    if (typeof myChart !== "undefined") myChart.destroy();
    myChart = new Chart(this.chartRef.current, {
      type: "bar",
      data: {
        labels: ["Change=", "Cheapest Competitor"],
        datasets: datasets,
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 16,
          text: "Your estimated monthly costs",
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "nearest",
          callbacks: {
            afterBody: (item, data) => {
              for (let i = 0; data.datasets.length > i; i++) {
                if (item[0].datasetIndex === i) {
                  return data.datasets[i].tooltip;
                }
              }
            },
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                callback: function (value) {
                  return "€" + value;
                },
              },
            },
          ],
        },
      },
    });
  };

  render() {
    return (
      <div>
        {this.state.expModalShow ? (
          <ExplanationModal hideModal={this.hideModal} />
        ) : null}

        <div className="sidenav">
          <div onClick={() => this.showModal()} className="chart-container">
            <canvas ref={this.chartRef} />
          </div>
          <button
            onClick={() => {
              this.buildChart(this.state.chart); // arrow fn so the fn isn't called on load
            }}
          >
            Update
          </button>
          <div className="price">€{this.state.totalPrice}</div>
          <a href="https://www.google.com" className="aanmelden-link">
            <button type="submit" className="submit">
              Aanmelden
              <ChevronRightIcon className="dropdown-submit-icon" />
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default SidePanel;
