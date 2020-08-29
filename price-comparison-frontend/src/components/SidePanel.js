import React, { Component } from "react";

import Chart from "chart.js";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import dummyData from "../react-dummy_form_answer.json";
// import dummyPrices from "../react-dummy_prices-response.JSON";

const dummyPrices = [
  {
    titel: "Water cost",
    price: 10,
    tooltip: "Monthly water cost",
    explenation:
      "Dont like your water bill well neither we do like paying bills but since we make some money we will also pay bills or buy pills",
    standard: true,
    color: "#ff0000",
  },
  {
    titel: "Energy cost",
    price: 10,
    tooltip: "Engery engery energy. Click here to learn more",
    explenation:
      "Energy is what we need what drives us and so on maybe try to inerst a hyper link www.giyf.com can we open it? Not even sure if its a real link tbh",
    standard: true,
    color: "#000000",
  },
  {
    titel: "Service cost",
    price: 60,
    tooltip: "We provide service please pay. Click here to learn more",
    explenation: "Alot of services very cool you see veryyyy cool",
    standard: true,
    color: "#00ff00",
  },
  {
    titel: "Competitor",
    price: 60,
    tooltip: "Competitor Tooltip",
    explenation: "They suck.",
    standard: true,
    color: "#555555",
  },
];

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
    let datasets = [];
    dummyPrices.forEach((set) => {
      if (set.titel === "Competitor") {
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
