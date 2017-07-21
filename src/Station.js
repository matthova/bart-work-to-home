import React, { Component } from 'react';

export default class Station extends Component {
  render() {
    return (
      <div className="station">
        <p>{this.props.station.station}</p>
      </div>
    );
  }
}
