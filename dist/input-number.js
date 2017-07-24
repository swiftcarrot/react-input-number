'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blacklist = require('blacklist');
var React = require('react');
var parseNumber = require('./parse');

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var InputNumber = function (_React$Component) {
  _inherits(InputNumber, _React$Component);

  function InputNumber(props) {
    _classCallCheck(this, InputNumber);

    var _this = _possibleConstructorReturn(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).call(this, props));

    _this.state = {
      value: _this.parse(props.value)
    };
    return _this;
  }

  _createClass(InputNumber, [{
    key: 'parse',
    value: function parse(val) {
      return parseNumber(val, this.props.step, this.props.max, this.props.min);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        value: this.parse(nextProps.value)
      });
    }
  }, {
    key: 'change',
    value: function change(value) {
      if (this.props.onChange) {
        this.props.onChange(this.parse(value));
      }
    }
  }, {
    key: 'up',
    value: function up() {
      this.change(this.state.value + this.props.step);
    }
  }, {
    key: 'down',
    value: function down() {
      this.change(this.state.value - this.props.step);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
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
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      if (e.keyCode === KEY_ENTER) {
        this.change(this.state.value);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        value: e.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = blacklist(this.props, 'step', 'min', 'max', 'onKeyUp', 'onKeyDown', 'onChange');
      var value = this.state.value;


      return React.createElement('input', _extends({}, props, {
        type: 'text',
        value: value,
        onKeyUp: function onKeyUp(e) {
          return _this2.handleKeyUp(e);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.handleKeyDown(e);
        },
        onChange: function onChange(e) {
          return _this2.handleChange(e);
        }
      }));
    }
  }]);

  return InputNumber;
}(React.Component);

InputNumber.defaultProps = {
  step: 1
};

module.exports = InputNumber;