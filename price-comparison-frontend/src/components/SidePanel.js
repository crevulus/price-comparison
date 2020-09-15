import React, { Component } from "react";

import Chart from "chart.js";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

let myChart;
let newTotalPrice = 0;

export class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      pricesData: "",
      datasets: [],
    };
    this.chartRef = React.createRef();
  }

  handleChartClick = () => {
    if (this.state.pricesData) {
      this.props.onClick();
    } else return;
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
    if (this.state.pricesData) {
      this.calculatePrice(this.state.pricesData);
    }
  }

  componentDidUpdate = () => {};

  calculatePrice = (data) => {
    newTotalPrice = 0;
    data.forEach((dataset) => {
      if (dataset.titel === "Competiors price") {
        return;
      }
      newTotalPrice += dataset.price;
    });
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
                beginAtZero: true,
                display: false,
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
        <div className="sidenav">
          <div onClick={this.handleChartClick} className="chart-container">
            <canvas ref={this.chartRef} />
          </div>

          <div className="price">€{newTotalPrice}</div>
          <button
            className="update"
            onClick={() => {
              this.buildChart(this.state.chart);
              this.calculatePrice(this.state.pricesData); // arrow fn so the fn isn't called on load
            }}
            disabled={!this.state.pricesData}
          >
            Update Chart
          </button>
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
