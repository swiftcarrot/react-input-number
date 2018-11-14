import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React, { Component } from 'react';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

export function parseText(value) {
  if (isNumber(value)) return value;

  if (isString(value)) {
    value = value.trim();

    if (!value) return '';
    const num = parseFloat(value);

    return num;
  }

  return '';
}

export function parseNumber(num, { step, max, min } = {}) {
  if (typeof max === 'number' && num > max) return max;
  if (typeof min === 'number' && num < min) return min;

  if (step) {
    const p = (step.toString().split('.')[1] || []).length;
    if (p) return parseFloat(num.toFixed(p));
  }
}

export default class InputNumber extends Component {
  static defaultProps = {
    step: 1
  };

  static getDerivedStateFromProps(props, state) {
    const { value } = props;

    if (isNumber(value)) {
      if (parseText(state.text, props) !== value) {
        return {
          text: isNumber(value) ? `${value}` : ''
        };
      }
    }

    return null;
  }

  state = {
    text: ''
  };

  change(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  up() {
    const parsed = parseText(this.state.text, this.props);
    this.change(this.state.text + this.props.step);
  }

  down() {
    this.change(this.state.text - this.props.step);
  }

  handleKeyDown = e => {
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
  };

  handleKeyUp = e => {
    if (e.keyCode === KEY_ENTER) {
      this.change(this.state.value);
    }
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState({ text }, () => {
      const parsed = parseText(text, this.props);
      this.change(parsed);
    });
  };

  render() {
    const {
      step,
      min,
      max,
      onKeyUp,
      onKeyDown,
      onChange,
      ...props
    } = this.props;

    return (
      <input
        {...props}
        type="text"
        value={this.state.text}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
      />
    );
  }
}
