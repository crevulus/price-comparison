import React, { Component } from "react";

import Chart from "chart.js";
import ReactGA from "react-ga";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

let myChart;
let newTotalPrice;

export class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      pricesData: "",
      datasets: [],
      hasError: false,
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
  }

  calculatePrice = (data) => {
    newTotalPrice = 0;
    data.forEach((dataset) => {
      if (dataset.titel === "Competitor Price by Pro-Evo Technologies") {
        return;
      }
      newTotalPrice += dataset.price;
    });
    this.setState({ totalPrice: newTotalPrice });
  };

  buildChart = () => {
    if (this.state.pricesData) {
      this.calculatePrice(this.state.pricesData);
    }
    let datasets = [];
    if (this.state.pricesData) {
      this.state.pricesData.forEach((set) => {
        if (set.titel === "Competitor Price by Pro-Evo Technologies") {
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
        labels: ["Change=", "Goedkoopste concurrent"],
        datasets: datasets,
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontSize: 16,
          text: "De schatting van jouw maandelijkse kosten",
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "nearest",
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";

              if (label) {
                label += ": ";
              }
              label += tooltipItem.yLabel.toFixed(2);
              return label;
            },
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

  fireGoogleTagAanmelden = () => {
    ReactGA.event({
      category: "Nav",
      action: "Go to Reg",
      label: "Aanmelden",
    });
  };

  fireGoogleTagBuildUpdate = () => {
    ReactGA.event({
      category: "Interact",
      action: "Build/Update",
      label: "Build/Update",
    });
  };

  render() {
    return (
      <div className="sidenav">
        <div onClick={this.handleChartClick} className="chart-container">
          <canvas ref={this.chartRef} />
        </div>

        <div className="price">Total: €{this.state.totalPrice.toFixed(2)}</div>
        {this.state.totalPrice ? (
          <p className="click-here">
            Click the chart to see full price details.
          </p>
        ) : null}
        {this.state.totalPrice ? (
          <button
            className="update"
            id="build-update"
            onClick={() => {
              this.buildChart(this.state.chart);
              this.fireGoogleTagBuildUpdate();
            }}
            disabled={!this.state.pricesData}
          >
            Update Chart
          </button>
        ) : (
          <button
            className="build"
            id="build-update"
            onClick={() => {
              this.buildChart(this.state.chart);
              this.fireGoogleTagBuildUpdate();
            }}
            disabled={!this.state.pricesData}
          >
            Bereken
          </button>
        )}
        <a
          href="https://www.change-is.com/nl/register"
          className="aanmelden-link"
          onClick={this.fireGoogleTagAanmelden}
        >
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
