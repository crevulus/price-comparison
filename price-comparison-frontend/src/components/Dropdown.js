import React, { Component } from "react";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import "../App.css";
import "../styles/dropdown.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      locationDropdownText: "Select Location",
      locationCode: "",
    };

    this.showMenu = this.showMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showMenu = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  handleClick = (e) => {
    this.setState({
      locationDropdownText: e.target.value,
      locationCode: e.target.dataset.code,
    });
    this.showMenu(e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onDropdownSubmit(this.state.locationCode);
  };

  render() {
    return (
      <div className="question-block">
        <div>Choose your location</div>
        <form onSubmit={this.handleSubmit} className="location-form">
          <div className="dropdown">
            <button onClick={this.showMenu} className="dropdown-btn">
              {this.state.locationDropdownText}
            </button>
            {this.state.showMenu ? (
              <div className="dropdown-content">
                {this.props.locationNames.map((location) => {
                  return (
                    <button
                      value={location.Location_name}
                      data-code={location.Location_code}
                      onClick={this.handleClick}
                      key={location.Location_code}
                    >
                      {location.Location_name}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
          <button type="submit" className="submit">
            Go
            <ChevronRightIcon className="dropdown-submit-icon" />
          </button>
        </form>
      </div>
    );
  }
}
