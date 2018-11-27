import isNaN from 'lodash/isNaN';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import React, { Component } from 'react';

const KEY_UP = 38;
const KEY_DOWN = 40;

export function parseText(text, { max, min } = {}) {
  if (isNumber(text)) return text;

  if (isString(text)) {
    text = text.trim();

    if (!text) return '';
    const num = parseFloat(text);

    if (!isNaN(num)) {
      if (isNumber(max) && num > max) return max;
      if (isNumber(min) && num < min) return min;
      return num;
    }
  }

  return '';
}

export function changeValue(mod, value, { max, min, step } = {}) {
  if (value === '') {
    if (isNumber(min)) return min;
    return '';
  }

  value = mod === '+' ? value + step : value - step;

  if (isNumber(max) && value > max) return max;
  if (isNumber(min) && value < min) return min;

  const p = (step.toString().split('.')[1] || []).length;
  if (p) {
    return parseFloat(value.toFixed(p));
  }

  return value;
}

class InputNumber extends Component {
  static defaultProps = {
    value: '',
    step: 1
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.prev && props.value !== state.value) {
      return {
        prev: props.value,
        value: props.value,
        text: `${props.value}`
      };
    }

    return { prev: props.value };
  }

  state = {
    value: '',
    text: ''
  };

  change(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  up() {
    this.change(changeValue('+', this.state.value, this.props));
  }

  down() {
    this.change(changeValue('-', this.state.value, this.props));
  }

  handleKeyDown = e => {
    if (e.keyCode === KEY_UP) {
      this.up();
    } else if (e.keyCode === KEY_DOWN) {
      this.down();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  handleChange = text => {
    const value = parseText(text, this.props);
    this.setState({ text, value }, () => {
      this.change(value);
    });
  };

  render() {
    const { step, min, max, value, onChange, ...props } = this.props;

    return (
      <input
        {...props}
        type="text"
        value={this.state.text}
        onChange={e => this.handleChange(e.target.value)}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default InputNumber;
