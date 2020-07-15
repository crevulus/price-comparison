import React, { Component } from "react";
import Chart from "chart.js";
import dummyData from "../react-dummy_form_answer.json";

export class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      chart: {},
    };
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChart = new Chart(this.chartRef.current, {
      type: "bar",
      data: {
        labels: ["Change=", "Competitor"],
        datasets: [
          {
            label: "Service costs",
            backgroundColor: "pink",
            data: [, 175],
          },
          {
            label: "Base rent",
            backgroundColor: "lightyellow",
            data: [600, 650],
          },
          {
            label: "Add ons",
            backgroundColor: "lightgreen",
            data: [80, 120],
          },
          {
            label: "Water",
            backgroundColor: "lightblue",
            data: [30, 30],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "nearest",
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
                // Include a dollar sign in the ticks
                callback: function (value) {
                  return "$" + value;
                },
              },
            },
          ],
        },
      },
    });
    this.setState({ chart: myChart });
  }

  updateChart = (chart) => {
    chart.data.datasets[0].data = [100, 100];
    chart.update();
    // console.log(chart.data.datasets);
  };

  render() {
    return (
      <div className="sidenav" data={dummyData}>
        <div class="chart-container">
          <canvas ref={this.chartRef} />
        </div>
        <button
          onClick={() => {
            this.updateChart(this.state.chart);
          }}
        >
          Update
        </button>
      </div>
    );
  }
}

export default SidePanel;
