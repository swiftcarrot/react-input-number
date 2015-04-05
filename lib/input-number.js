var React = require('react');

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

function parse(value) {
  if(value) return parseInt(value || 0, 10);
  return '';
}

module.exports = React.createClass({
  displayName: 'InputNumber',

  getInitialState: function() {
    return {
      value: this.props.value
    }
  },

  render: function() {
    var value = parse(this.state.value);

    return <input
      className={this.props.className}
      type="text"
      value={value}
      onKeyUp={this._onKeyUp}
      onKeyDown={this._onKeyDown}
      onChange={this._onChange}/>;
  },

  componentWillReceiveProps: function(nextProps) {
    if(!this._updated) {
      this.setState({
        value: parse(nextProps.value)
      });
    } else {
      this._updated = false;
    }
  },

  change: function(value) {
    if(this.props.onChange) {
      this.props.onChange(value);
    }
  },

  up: function() {
    this.change(this.state.value+1);
  },

  down: function() {
    this.change(this.state.value-1);
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
    var val = parse(e.target.value);
    this.setState({
      value: val
    });
  }
});