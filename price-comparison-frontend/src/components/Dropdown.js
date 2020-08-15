import React, { Component } from "react";
import "../App.css";
import "../styles/dropdown.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  handleClick = (e) => {
    console.log(e.target.value);
  };

  render() {
    return (
      <div className="question-block">
        <p>Choose your location</p>
        <div className="dropdown">
          <button onClick={this.showMenu} className="dropdown-btn">
            Show menu
          </button>
          {this.state.showMenu ? (
            <div className="dropdown-content">
              {this.props.locationNames.map((location) => {
                return (
                  <button
                    value={location.Location_name}
                    onClick={this.handleClick}
                  >
                    {location.Location_name}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
