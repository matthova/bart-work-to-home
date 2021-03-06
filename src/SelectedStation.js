import React, { Component } from "react";
import request from "request-promise";
import propTypes from "prop-types";

import Destination from "./Destination";

export default class SelectedStation extends Component {
  constructor(props) {
    super();

    this.state = {
      etds: [],
      updater: this.startUpdater(props.station.abbr)
    };
  }

  startUpdater(abbr) {
    this.getStationETDs(abbr);
    return setInterval(() => {
      this.getStationETDs(abbr);
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.state.updater);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.station.abbr !== this.props.station.abbr) {
      clearInterval(this.state.updater);
      this.setState({ updater: this.startUpdater(nextProps.station.abbr) });
    }
  }

  renderDestinations() {
    try {
      return this.state.etds.map((destination, i) => {
        return <Destination key={i} destination={destination} />;
      });
    } catch (ex) {
      // In case error when parsing trains, return null
      console.error("Parsing train error", ex);
      return null;
    }
  }

  // Collect ETD info from a single station and return it as a JSON object
  async getStationETDs(abbr) {
    const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    try {
      const reply = await request(stationUrl, { json: true });
      reply.abbr = abbr;
      const etds = reply.root.station[0].etd;
      this.setState({ etds });
    } catch (ex) {
      return null;
    }
  }

  render() {
    return (
      <div className="selected-station">
        <h1 className="selected-station-name">
          {this.props.station.name}
        </h1>
        <div className="destinations">
          {this.renderDestinations()}
        </div>
      </div>
    );
  }
}

SelectedStation.propTypes = {
  station: propTypes.object.isRequired
};
