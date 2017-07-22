import React, { Component } from 'react';
import propTypes from 'prop-types';

import Destination from './Destination';

export default class Train extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p className="train">{Number.isNaN(Number(this.props.train.minutes)) ? this.props.train.minutes : `${this.props.train.minutes} minutes`}</p>
        <p>{this.props.train.length} cars</p>
      </div>
    );
  }
}

Train.propTypes = {
  train: propTypes.object.isRequired
}
