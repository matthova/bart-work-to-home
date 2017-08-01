import React, { Component } from 'react';
import request from 'request-promise';
import propTypes from 'prop-types';
import autobind from 'autobind';

import Destination from './Destination';

export default class Station extends Component {
  constructor() {
    super();

    this.state = {
      etds: [],
      updater: null,
    }

    autobind(this);
  }

  renderDestinations() {
    try {
      const destinations = this.props.station.root.station[0].etd;
      return destinations.map((destination, i) => {
        return <Destination key={i} destination={destination} />
      });
    } catch (ex) {
      // In case error when parsing trains, return null
      console.error('Parsing train error', ex);
      return null;
    }
  }

    // Collect ETD info from a single station and return it as a JSON object
  async getStationETDs(station) {
    const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station}&key=MW9S-E7SL-26DU-VV8V&json=y`;
    try {
      const reply = await request(stationUrl, { json: true })
      reply.station = station;
      return reply;
    } catch(ex) {
      return null;
    }
  }

  handleClick() {
    console.log('eyyy');
  }

  render() {
    return (
      <div className="station">
        <h1 className="station-name" onClick={this.handleClick}>{this.props.station.name}</h1>
        {this.renderDestinations()}
      </div>
    );
  }
}

Station.propTypes = {
  station: propTypes.object.isRequired
}
