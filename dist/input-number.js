'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var blacklist = require('blacklist');
var React = require('react');
var parseNumber = require('./parse');

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

module.exports = React.createClass({
  displayName: 'InputNumber',

  getDefaultProps: function getDefaultProps() {
    return {
      step: 1
    };
  },
  parse: function parse(val) {
    return parseNumber(val, this.props.step, this.props.max, this.props.min);
  },
  getInitialState: function getInitialState() {
    return {
      value: this.parse(this.props.value)
    };
  },
  render: function render() {
    var props = blacklist(this.props, 'step', 'min', 'max', 'onKeyUp', 'onKeyDown', 'onChange');

    return React.createElement('input', _extends({}, props, {
      type: 'text',
      value: this.state.value,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange
    }));
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.parse(nextProps.value)
    });
  },
  change: function change(value) {
    if (this.props.onChange) {
      this.props.onChange(this.parse(value));
    }
  },
  up: function up() {
    this.change(this.state.value + this.props.step);
  },
  down: function down() {
    this.change(this.state.value - this.props.step);
  },
  handleKeyDown: function handleKeyDown(e) {
    switch (e.keyCode) {
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
  handleKeyUp: function handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
      this.change(this.state.value);
    }
  },
  handleChange: function handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
});