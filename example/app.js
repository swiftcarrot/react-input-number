var React = require('react');
var InputNumber = require('../lib/input-number.js')
require('!style!css!less!../lib/input-number.less');

var App = React.createClass({
  getInitialState: function() {
    return {number: 73};
  },

  render: function() {
    return <InputNumber
      value={this.state.number}
      onChange={this._onChange}/>;
  },

  _onChange: function(value) {
    this.setState({number: value});
  }
});

React.render(<App/>, document.body);