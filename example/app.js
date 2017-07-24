const React = require('react');
const ReactDOM = require('react-dom');
const InputNumber = require('../lib/input-number.js');
const packageJSON = require('../package.json');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 73.1
    };
  }

  _onChange(value) {
    console.log('onChange value', value);
    this.setState({ number: value });
  }

  _onInputChange(e) {
    this.setState({ number: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>
          {packageJSON.name} {packageJSON.version}
        </h1>
        <InputNumber
          className="input"
          min={10}
          max={100}
          step={0.03}
          value={this.state.number}
          onChange={value => this._onChange(value)}
        />
        <br />
        <input
          className="input"
          type="number"
          min="10"
          max="100"
          step="0.03"
          value={this.state.number}
          onChange={e => this._onInputChange(e)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
