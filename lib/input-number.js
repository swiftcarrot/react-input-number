var blacklist = require('blacklist');
var React = require('react');
var parseNumber = require('./parse');

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

module.exports = React.createClass({
  displayName: 'InputNumber',

  getDefaultProps() {
    return {
      step: 1
    };
  },

  parse(val) {
    return parseNumber(val, this.props.step, this.props.max, this.props.min);
  },

  getInitialState() {
    return {
      value: this.parse(this.props.value)
    }
  },

  render() {
    var props = blacklist(this.props, 'step', 'min', 'max', 'onKeyUp', 'onKeyDown', 'onChange');

    return (
      <input {... props}
        type="text"
        value={this.state.value}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
      />
    );
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.parse(nextProps.value)
    });
  },

  change(value) {
    if(this.props.onChange) {
      this.props.onChange(this.parse(value));
    }
  },

  up() {
    this.change(this.state.value+this.props.step);
  },

  down() {
    this.change(this.state.value-this.props.step);
  },

  handleKeyDown(e) {
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

  handleKeyUp(e) {
    if(e.keyCode === KEY_ENTER) {
      this.change(this.state.value);
    }
  },

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
});
