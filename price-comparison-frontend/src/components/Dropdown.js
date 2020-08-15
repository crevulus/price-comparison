import React, { Component } from "react";
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
    console.log(this.state.locationCode);
  };

  render() {
    return (
      <div className="question-block">
        <p>Choose your location</p>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
}
