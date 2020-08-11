import React, { Component } from "react";
import "../App.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  }

  render() {
    return (
      <div className="question-block">
        <p>Choose your location</p>
        <button onClick={this.showMenu}>Show menu</button>
        {this.state.showMenu ? (
          <div>
            {this.props.locationNames.map((location) => {
              return <button>{location.Location_name}</button>;
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
