import React, { Component } from 'react';
import { render } from 'react-dom';
import InputNumber from '../src/input-number';
import pkg from '../package.json';

class App extends Component {
  state = {
    number: 73.1,
    max: 100,
    min: 10,
    step: 0.03
  };

  handleChange = value => {
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

        <div>
          <div>number: {this.state.number}</div>
          <div>max: {this.state.max}</div>
          <div>min: {this.state.min}</div>
          <div>step: {this.state.step}</div>
        </div>

        <div>
          <div>
            max: <InputNumber onChange={max => this.setState({ max })} />
          </div>
          <div>
            min: <InputNumber onChange={min => this.setState({ min })} />
          </div>
          <div>
            step: <InputNumber onChange={step => this.setState({ step })} />
          </div>
        </div>

        <InputNumber
          className="input"
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          value={this.state.number}
          onChange={this.handleChange}
        />
        <br />
        <input
          className="input"
          type="number"
          min={this.state.min}
          max={this.state.max}
          step={this.state.step}
          value={this.state.number}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
