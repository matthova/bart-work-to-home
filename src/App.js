import React, { Component } from 'react';

import './App.css';
import Station from './Station';
import stations from './stations.json';

class App extends Component {
  constructor() {
    super();

    this.stations = stations;

    this.state = {
      position: null,
    };
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ position });
    });
  }

  componentWillMount() {
    this.setLocation();
  }

  renderStationList() {
    return this.stations.root.stations.station.map((station, i) => {
      return <Station key={i} station={station} />
    });
  }

  renderSelectedStation() {
    return <div>Cool</div>;
  }

  render() {
    return (
      <div className="App container">
        {this.renderStationList()}
      </div>
    );
  }
}

export default App;
