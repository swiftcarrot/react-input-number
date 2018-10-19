import React, { Component } from 'react';
import { render } from 'react-dom';
import InputNumber from '../src/input-number';
import pkg from '../package.json';

class App extends Component {
  state = {
    number: 73.1
  };

  handleChange = value => {
    console.log('onChange value', value);
    this.setState({ number: value });
  };

  handleInputChange = e => {
    this.setState({ number: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>
          {pkg.name} {pkg.version}
        </h1>
        <InputNumber
          className="input"
          min={10}
          max={100}
          step={0.03}
          value={this.state.number}
          onChange={this.handleChange}
        />
        <br />
        <input
          className="input"
          type="number"
          min="10"
          max="100"
          step="0.03"
          value={this.state.number}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
