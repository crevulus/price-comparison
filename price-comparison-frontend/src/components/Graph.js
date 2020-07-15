import React, { Component } from "react";
import Chart from "chart.js";
import "../App.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.data = props.data;
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
  }

  render() {
    // const graphStyle = {
    //   backgroundColor: "red",
    //   position: "relative",
    //   height: 50,
    //   width: 10,
    //   responsive: false,
    // };

    return (
      <div class="chart-container">
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default Graph;
