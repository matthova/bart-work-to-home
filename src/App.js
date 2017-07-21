import React, { Component } from 'react';
import request from 'request-promise';
import bluebird from 'bluebird';

class App extends Component {
  constructor() {
    super();
    this.state = {
      updater: null,
      etds: {
        DELN: [],
        EMBR: [],
      }
    };
  }

  componentWillUnmount() {
    if (this.state.updater) {
      clearInterval(this.state.updater);
      this.setState({ updater: null });
    }
  }

  // Collected ETD info from each station
  async getStationsETDs() {
    const results = await bluebird.map(Object.keys(this.state.etds), async (station) => {
      return await this.getStationETDs(station);
    });

    const etds = {};
    results.forEach((result) => {
      etds[result.station] = result;
    });

    this.setState({ etds });
  }

  // Collect ETD info from a single station and return it as a JSON object
  async getStationETDs(station) {
    const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    const reply = JSON.parse(await request(stationUrl));
    reply.station = station;
    return reply;
  }

  componentWillMount() {
    const updater = setInterval(this.getStationsETDs.bind(this), 10000);
    this.getStationsETDs();
    this.setState({ updater });
  }

  renderStations() {
    Object.entries(this.state.etds).map(([stationKey, stationObject]) => {

    });
  }

  render() {
    return (
      <div className="App">
        {this.renderStations()}
      </div>
    );
  }
}

export default App;
