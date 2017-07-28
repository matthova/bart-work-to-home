import React, { Component } from 'react';
import request from 'request-promise';
import bluebird from 'bluebird';

import './App.css';
import Station from './Station';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dev: false,
      updater: null,
      etds: {
        DELN: null,
        EMBR: null,
        MONT: null,
        LAKE: null,
      },
      fake: {
        DELN: { station: "DELN", "?xml":{"@version":"1.0","@encoding":"utf-8"},"root":{"@id":"1","uri":{"#cdata-section":"http://api.bart.gov/api/etd.aspx?cmd=etd&orig=DELN&json=y"},"date":"07/26/2017","time":"08:49:46 AM PDT","station":[{"name":"El Cerrito del Norte","abbr":"DELN","etd":[{"destination":"Fremont","abbreviation":"FRMT","limited":"0","estimate":[{"minutes":"6","platform":"2","direction":"South","length":"6","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"},{"minutes":"20","platform":"2","direction":"South","length":"4","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"},{"minutes":"35","platform":"2","direction":"South","length":"6","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"}]},{"destination":"Millbrae","abbreviation":"MLBR","limited":"0","estimate":[{"minutes":"12","platform":"2","direction":"South","length":"8","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"27","platform":"2","direction":"South","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"42","platform":"2","direction":"South","length":"10","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"Richmond","abbreviation":"RICH","limited":"0","estimate":[{"minutes":"2","platform":"1","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"14","platform":"1","direction":"North","length":"6","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"},{"minutes":"16","platform":"1","direction":"North","length":"10","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]}]}],"message":""}},
        EMBR: { station: "EMBR", "?xml":{"@version":"1.0","@encoding":"utf-8"},"root":{"@id":"1","uri":{"#cdata-section":"http://api.bart.gov/api/etd.aspx?cmd=etd&orig=EMBR&json=y"},"date":"07/26/2017","time":"08:49:46 AM PDT","station":[{"name":"Embarcadero","abbr":"EMBR","etd":[{"destination":"Daly City","abbreviation":"DALY","limited":"0","estimate":[{"minutes":"2","platform":"1","direction":"South","length":"8","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"4","platform":"1","direction":"South","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"11","platform":"1","direction":"South","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"}]},{"destination":"Dublin/Pleasanton","abbreviation":"DUBL","limited":"0","estimate":[{"minutes":"6","platform":"2","direction":"North","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"},{"minutes":"20","platform":"2","direction":"North","length":"8","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"},{"minutes":"35","platform":"2","direction":"North","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"}]},{"destination":"Millbrae","abbreviation":"MLBR","limited":"0","estimate":[{"minutes":"Leaving","platform":"1","direction":"South","length":"10","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"14","platform":"1","direction":"South","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"29","platform":"1","direction":"South","length":"8","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"Pittsburg/Bay Point","abbreviation":"PITT","limited":"0","estimate":[{"minutes":"9","platform":"2","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"23","platform":"2","direction":"North","length":"9","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"38","platform":"2","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Richmond","abbreviation":"RICH","limited":"0","estimate":[{"minutes":"2","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"17","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"30","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"SF Airport","abbreviation":"SFIA","limited":"0","estimate":[{"minutes":"7","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"25","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"36","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Warm Springs","abbreviation":"WARM","limited":"0","estimate":[{"minutes":"Leaving","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"13","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"25","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"}]}]}],"message":""}},
        MONT: { station: "MONT", "?xml":{"@version":"1.0","@encoding":"utf-8"},"root":{"@id":"1","uri":{"#cdata-section":"http://api.bart.gov/api/etd.aspx?cmd=etd&orig=MONT&json=y"},"date":"07/26/2017","time":"08:49:46 AM PDT","station":[{"name":"Montgomery St.","abbr":"MONT","etd":[{"destination":"Daly City","abbreviation":"DALY","limited":"0","estimate":[{"minutes":"3","platform":"1","direction":"South","length":"8","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"5","platform":"1","direction":"South","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"12","platform":"1","direction":"South","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"}]},{"destination":"Dublin/Pleasanton","abbreviation":"DUBL","limited":"0","estimate":[{"minutes":"4","platform":"2","direction":"North","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"},{"minutes":"19","platform":"2","direction":"North","length":"8","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"},{"minutes":"34","platform":"2","direction":"North","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"}]},{"destination":"Millbrae","abbreviation":"MLBR","limited":"0","estimate":[{"minutes":"1","platform":"1","direction":"South","length":"10","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"15","platform":"1","direction":"South","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"30","platform":"1","direction":"South","length":"8","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"Pittsburg/Bay Point","abbreviation":"PITT","limited":"0","estimate":[{"minutes":"7","platform":"2","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"21","platform":"2","direction":"North","length":"9","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"36","platform":"2","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Richmond","abbreviation":"RICH","limited":"0","estimate":[{"minutes":"Leaving","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"16","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"28","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"SF Airport","abbreviation":"SFIA","limited":"0","estimate":[{"minutes":"8","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"27","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"37","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Warm Springs","abbreviation":"WARM","limited":"0","estimate":[{"minutes":"12","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"24","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"39","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"}]}]}],"message":""}},
        LAKE: { station: "LAKE", "?xml":{"@version":"1.0","@encoding":"utf-8"},"root":{"@id":"1","uri":{"#cdata-section":"http://api.bart.gov/api/etd.aspx?cmd=etd&orig=MONT&json=y"},"date":"07/26/2017","time":"08:49:46 AM PDT","station":[{"name":"Montgomery St.","abbr":"MONT","etd":[{"destination":"Daly City","abbreviation":"DALY","limited":"0","estimate":[{"minutes":"3","platform":"1","direction":"South","length":"8","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"5","platform":"1","direction":"South","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"12","platform":"1","direction":"South","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"}]},{"destination":"Dublin/Pleasanton","abbreviation":"DUBL","limited":"0","estimate":[{"minutes":"4","platform":"2","direction":"North","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"},{"minutes":"19","platform":"2","direction":"North","length":"8","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"},{"minutes":"34","platform":"2","direction":"North","length":"9","color":"BLUE","hexcolor":"#0099cc","bikeflag":"1"}]},{"destination":"Millbrae","abbreviation":"MLBR","limited":"0","estimate":[{"minutes":"1","platform":"1","direction":"South","length":"10","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"15","platform":"1","direction":"South","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"30","platform":"1","direction":"South","length":"8","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"Pittsburg/Bay Point","abbreviation":"PITT","limited":"0","estimate":[{"minutes":"7","platform":"2","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"21","platform":"2","direction":"North","length":"9","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"36","platform":"2","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Richmond","abbreviation":"RICH","limited":"0","estimate":[{"minutes":"Leaving","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"16","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"28","platform":"2","direction":"North","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"SF Airport","abbreviation":"SFIA","limited":"0","estimate":[{"minutes":"8","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"27","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"37","platform":"1","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Warm Springs","abbreviation":"WARM","limited":"0","estimate":[{"minutes":"12","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"24","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"},{"minutes":"39","platform":"2","direction":"North","length":"10","color":"GREEN","hexcolor":"#339933","bikeflag":"1"}]}]}],"message":""}},
      },
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
      if (result != null) {
        etds[result.station] = result;
      }
    });

    this.setState({ etds });
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

  componentWillMount() {
    if (this.state.dev) { return; }
    const updater = setInterval(this.getStationsETDs.bind(this), 10000);
    this.getStationsETDs();
    this.setState({ updater });
  }

  renderStations() {
    if (this.state.dev) {
      return Object.keys(this.state.fake).map(key => {
        return this.state.fake[key] ? <Station key={key} station={this.state.fake[key]} /> : null
      });
    }

    return Object.keys(this.state.etds).map(key => {
      return this.state.etds[key] ? <Station key={key} station={this.state.etds[key]} /> : null
    });
  }

  render() {
    return (
      <div className="App container">
        {this.renderStations()}
      </div>
    );
  }
}

export default App;
