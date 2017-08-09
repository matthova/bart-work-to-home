import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default class StationList extends Component {
  render() {
    const sortedStations = this.props.stations.sort((a, b) => {
      return a.distance - b.distance;
    });

    return (
      <div className="station-list">
        {sortedStations.map((station, i) => {
          return (
            <Link className="station-name" key={i} to={station.abbr}>
              {station.name} ({station.distance} miles)
            </Link>
          );
        })}
      </div>
    );
  }
}

StationList.propTypes = {
  stations: propTypes.array.isRequired,
  position: propTypes.object.isRequired
};
