var React = require('react');

var KEY_UP = 38;
var KEY_DOWN = 40;

module.exports = React.createClass({
  displayName: 'InputNumber',

  getInitialState: function() {
    return {controlClass: 'control'};
  },

  render: function() {
    var value = parseInt(this.props.value || 0, 10);
    this.value = value;

    return (
      React.createElement("span", {className: "m-input-number"}, 
        React.createElement("input", {type: "text", value: value, 
          onFocus: this._onFocus, onBlur: this._onBlur, 
          onKeyDown: this._onKeyDown, 
          onChange: this._onChange}), 
        React.createElement("span", {className: this.state.controlClass}, 
          React.createElement("span", {className: "up", onClick: this.up}, "▲"), 
          React.createElement("span", {className: "down", onClick: this.down}, "▼")
        )
      )
    );
  },

  change: function(value) {
    if(this.props.onChange) {
      this.props.onChange(value);
    }
  },

  up: function() {
    this.change(this.value+1);
  },

  down: function() {
    this.change(this.value-1);
  },

  _onFocus: function() {
    this.setState({
      controlClass: 'control control-hide'
    });
  },

  _onBlur: function() {
    this.setState({
      controlClass: 'control'
    });
  },

  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case KEY_UP:
        this.up();
        break;
      case KEY_DOWN:
        this.down();
        break;
    }
  },

  _onChange: function(e) {
    this.change(parseInt(e.target.value, 10));
  }
});