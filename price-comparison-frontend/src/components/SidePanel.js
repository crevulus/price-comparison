import React, { Component } from "react";

import Chart from "chart.js";
import _ from "lodash";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: {},
      totalPrice: 0,
      pricesData: "",
      datasets: [],
    };
    this.chartRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pricesData !== prevState.pricesData) {
      return { pricesData: nextProps.pricesData };
    } else {
      return null;
    }
  }

  // componentDidMount() {
  //   this.buildChart();
  // }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(this.props.pricesData, prevProps.pricesData)) {
  //     this.buildChart();
  //   }
  // }

  // onGoClick = () => {
  //   this.buildChart();
  // };

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
    const myChart = new Chart(this.chartRef.current, {
      type: "bar",
      data: {
        labels: ["Change=", "Competitor"],
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
        // tooltips: {
        //   mode: "nearest",
        //   callbacks: {
        //     afterBody: (item, data) => {
        //       for (let i = 0; data.datasets.length > i; i++) {
        //         if (item[0].datasetIndex === i) {
        //           return data.datasets[i].tooltip;
        //         }
        //       }
        //     },
        //   },
        // },
        // tooltips: {
        //   // Disable the on-canvas tooltip
        //   enabled: false,

        //   custom:
        // },
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
    this.setState({ chart: myChart });
  };

  render() {
    return (
      <div className="sidenav">
        <div className="chart-container">
          <canvas ref={this.chartRef} />
        </div>
        <button
          onClick={() => {
            this.updateChart(this.state.chart); // arrow fn so the fn isn't called on load
          }}
        >
          Update
        </button>
        <button
          onClick={() => {
            this.buildChart(); // arrow fn so the fn isn't called on load
          }}
        >
          Build
        </button>
        <div className="price">€{this.state.totalPrice}</div>
        <a href="https://www.google.com" className="aanmelden-link">
          <button type="submit" className="submit">
            Aanmelden
            <ChevronRightIcon className="dropdown-submit-icon" />
          </button>
        </a>
      </div>
    );
  }
}

export default SidePanel;
