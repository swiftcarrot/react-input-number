var React = require('react');

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

function parse(value) {
  if(value === 0) return 0;
  if(value) return parseFloat(value);
  return '';
}

module.exports = React.createClass({
  displayName: 'InputNumber',

  getDefaultProps: function() {
    return {
      step: 1
    };
  },

  getInitialState: function() {
    return {
      value: parse(this.props.value)
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
      value: parse(nextProps.value)
    });
  },

  check: function(value) {
    var max = this.props.max;
    var min = this.props.min;

    if(typeof max === 'number' && value > max) return max;
    if(typeof min === 'number' && value < min) return min;
    return value;
  },

  change: function(value) {
    if(this.props.onChange) {
      var p = (this.props.step.toString().split('.')[1] || []).length
      this.props.onChange(this.check(value.toFixed(p)));
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
      this._updated = true;
    }
  },

  _onChange: function(e) {
    var val = e.target.value;

    // input value ends with '.'
    if(val.length && val[val.length-1] === '.') {
      this.setState({
        value: val
      });
    } else {
      this.setState({
        value: parse(val)
      });
    }
  }
});