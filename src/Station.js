import React, { Component } from 'react';
import propTypes from 'prop-types';

import Destination from './Destination';

export default class Station extends Component {
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

  render() {
    return (
      <div className="station">
        <h1 className="station-name">{this.props.station.station}</h1>
        {this.renderDestinations()}
      </div>
    );
  }
}

Station.propTypes = {
  station: propTypes.object.isRequired
}
