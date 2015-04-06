var React = require('react');
var InputNumber = require('../lib/input-number.js')

var App = React.createClass({
  getInitialState: function() {
    return {number: 73};
  },

  render: function() {
    return (
      <div>
        <InputNumber
          className="input"
          value={this.state.number}
          onChange={this._onChange}/>
        <br/>
        <input
          className="input"
          type="number"
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

React.render(<App/>, document.body);