import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import StationList from "./StationList";
import SelectedStation from "./SelectedStation";
import stations from "./stations.json";
import distance from "gps-distance";

class App extends Component {
  constructor() {
    super();

    this.state = {
      position: null,
      stations: stations.root.stations.station
    };

    this.renderSelectedStation = this.renderSelectedStation.bind(this);
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position });
    });
  }

  componentWillMount() {
    this.setLocation();
  }

  renderSelectedStation({ location }) {
    const station = this.state.stations.find(station => {
      return location.pathname.includes(station.abbr);
    });

    return station ? <SelectedStation station={station} /> : null;
  }

  componentWillUpdate(unknown, newState) {
    // Would be better to check if object changes, rather than if object no longer null
    if (this.state.position == null && newState.position != null) {
      this.calculateDistanceToStations(newState.position);
    }
  }

  calculateDistanceToStations(position) {
    const stations = Object.assign(this.state.stations);
    stations.map(station => {
      const distanceToStation = distance(
        Number(station.gtfs_latitude),
        Number(station.gtfs_longitude),
        position.coords.latitude,
        position.coords.longitude
      );

      station.distance = Number(distanceToStation).toFixed(1);
    });

    this.setState({ stations });
  }

  render() {
    return (
      <div className="App">
        <StationList
          stations={this.state.stations}
          position={this.state.position}
        />
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/"}>
            <Route path="/:station" render={this.renderSelectedStation} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
