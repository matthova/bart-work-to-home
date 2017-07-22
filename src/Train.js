import React, { Component } from 'react';
import propTypes from 'prop-types';

import Destination from './Destination';

export default class Train extends Component {
  // Handle edge cases of "Leaving" and "1 minute(s)"
  renderMinutesString(string){
    // Handle "Leaving"
    if (Number.isNaN(Number(string))) {
      return this.props.train.minutes;
    }

    // Handle if minute(s) === 1
    if (Number(this.props.train.minutes) === 1) {
      return `${this.props.train.minutes} minute`
    }

    // Otherwise just show "<n> minutes"
    return `${this.props.train.minutes} minutes`;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <p className="train">{this.renderMinutesString(this.props.train.minutes)}</p>
        <p>{this.props.train.length} cars</p>
      </div>
    );
  }
}

Train.propTypes = {
  train: propTypes.object.isRequired
}
