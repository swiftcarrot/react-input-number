var React = require('react');
var ReactDOM = require('react-dom');
var InputNumber = require('../lib/input-number.js')

var App = React.createClass({
  getInitialState: function() {
    return {number: 73.1};
  },

  render: function() {
    return (
      <div>
        <InputNumber
          className="input"
          min={10} max={100} step={0.03}
          value={this.state.number}
          onChange={this._onChange}/>
        <br/>
        <input
          className="input"
          type="number"
          min="10" max="100" step="0.03"
          value={this.state.number}
          onChange={this._onInputChange}/>
      </div>
    );
  },

  _onChange: function(value) {
    console.log('onChange value', value);
    this.setState({number: value});
  },

  _onInputChange: function(e) {
    this.setState({number: e.target.value});
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
