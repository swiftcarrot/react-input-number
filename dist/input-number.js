var React = require('react');
var _parse = require('./parse');

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

module.exports = React.createClass({
  displayName: 'InputNumber',

  getDefaultProps: function() {
    return {
      step: 1
    };
  },

  parse: function(val) {
    return _parse(val, this.props.step, this.props.max, this.props.min);
  },

  getInitialState: function() {
    return {
      value: this.parse(this.props.value)
    }
  },

  render: function() {
    return React.createElement("input", {
      className: this.props.className, 
      type: "text", 
      value: this.state.value, 
      onKeyUp: this._onKeyUp, 
      onKeyDown: this._onKeyDown, 
      onChange: this._onChange});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: this.parse(nextProps.value)
    });
  },

  change: function(value) {
    if(this.props.onChange) {
      this.props.onChange(this.parse(value));
    }
  },

  up: function() {
    this.change(this.state.value+this.props.step);
  },

  down: function() {
    this.change(this.state.value-this.props.step);
  },

  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case KEY_UP:
        e.preventDefault();
        this.up();
        break;
      case KEY_DOWN:
        e.preventDefault();
        this.down();
        break;
    }
  },

  _onKeyUp: function(e) {
    if(e.keyCode === KEY_ENTER) {
      this.change(this.state.value);
    }
  },

  _onChange: function(e) {
    this.setState({
      value: e.target.value
    });
  }
});