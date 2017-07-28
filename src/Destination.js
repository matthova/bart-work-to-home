import React, { Component } from 'react';
import propTypes from 'prop-types';

import Train from './Train';

export default class Destination extends Component {

  renderTrains() {
    return this.props.destination.estimate.map((train, i) => {
      return <Train key={i} train={train} />
    });
  }

  render() {
    return (
      <div className="destination">
        <h2 className="destination-name">{this.props.destination.destination}</h2>
        {this.renderTrains()}
      </div>
    );
  }
}

Destination.propTypes = {
  destination: propTypes.object.isRequired
}
