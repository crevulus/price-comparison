import React, { Component } from "react";
import Chart from "chart.js";
import dummyData from "../react-dummy_form_answer.json";

export class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: {},
      totalPrice: 0,
      pricesData: "",
    };
    this.chartRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pricesData !== prevState.pricesData) {
      console.log(nextProps.pricesData);
      return { pricesData: nextProps.pricesData };
    } else {
      return null;
    }
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
            data: [],
          },
          {
            label: "Base rent",
            backgroundColor: "lightyellow",
            data: [],
          },
          {
            label: "Add ons",
            backgroundColor: "lightgreen",
            data: [],
          },
          {
            label: "Water",
            backgroundColor: "lightblue",
            data: [],
          },
          {
            label: "Competitor",
            backgroundColor: "lightgrey",
            data: [, 800],
          },
        ],
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
    this.setState({ chart: myChart });
  }

  updateChart = (chart) => {
    console.log(this.props.pricesData);
    chart.data.datasets[0].data = [dummyData.serviceCosts["service-price"]];
    chart.data.datasets[1].data = [dummyData.building["20sqm-baserent"]];
    chart.data.datasets[2].data = [
      dummyData.tv10["tv10-price"] + dummyData.wifi10["wifi0-price"],
    ];
    chart.data.datasets[3].data = [dummyData.water["water-price"]];
    chart.update();
    let totalPrice =
      dummyData.serviceCosts["service-price"] +
      dummyData.building["20sqm-baserent"] +
      dummyData.tv10["tv10-price"] +
      dummyData.wifi10["wifi0-price"] +
      dummyData.water["water-price"];
    this.setState({ totalPrice: totalPrice });
  };

  render() {
    return (
      <div className="sidenav" data={dummyData}>
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
        <div className="price">€{this.state.totalPrice}</div>
      </div>
    );
  }
}

export default SidePanel;
