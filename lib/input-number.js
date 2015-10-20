var React = require('react');
var _parse = require('./parse');

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
    return _parse(val, this.props.step, this.props.max, this.props.min);
  },

  getInitialState() {
    return {
      value: this.parse(this.props.value)
    }
  },

  render() {
    return (
      <input
        className={this.props.className}
        type="text"
        value={this.state.value}
        onKeyUp={this._onKeyUp}
        onKeyDown={this._onKeyDown}
        onChange={this._onChange}
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

  _onKeyDown(e) {
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

  _onKeyUp(e) {
    if(e.keyCode === KEY_ENTER) {
      this.change(this.state.value);
    }
  },

  _onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
});
