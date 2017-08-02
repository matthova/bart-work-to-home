import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.css";
import Station from "./Station";
import stations from "./stations.json";

class App extends Component {
  constructor() {
    super();

    this.stations = stations.root.stations.station;

    this.state = {
      position: null
    };
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position });
    });
  }

  componentWillMount() {
    this.setLocation();
  }

  renderStationList() {
    return this.stations.map((station, i) => {
      return (
        <Link key={i} className="station-name" to={station.abbr}>
          {station.name}
        </Link>
      );
    });
  }

  renderSelectedStation() {
    return (
      <Switch>
        <Route
          path="/:station"
          render={({ match }) => {
            const station = this.stations.find(station => {
              return station.abbr === match.params.station;
            });

            return station ? <Station station={station} /> : null;
          }}
        />
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        <Route path={`${process.env.PUBLIC_URL}/`}>
          <div className="App container">
            <div className="stations">
              <nav>
                {this.renderStationList()}
              </nav>
            </div>
            <div className="selected-station">
              {this.renderSelectedStation()}
            </div>
          </div>
        </Route>
      </Router>
    );
  }
}

export default App;
