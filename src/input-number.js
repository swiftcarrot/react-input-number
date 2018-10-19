import React from 'react';
import parseNumber from './parse';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

export default class InputNumber extends React.Component {
  static defaultProps = {
    step: 1
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.parse(props.value)
    };
  }

  parse(val) {
    return parseNumber(val, this.props.step, this.props.max, this.props.min);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: this.parse(nextProps.value)
    });
  }

  change(value) {
    if (this.props.onChange) {
      this.props.onChange(this.parse(value));
    }
  }

  up() {
    this.change(this.state.value + this.props.step);
  }

  down() {
    this.change(this.state.value - this.props.step);
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
    this.setState({
      value: e.target.value
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
    const { value } = this.state;

    return (
      <input
        {...props}
        type="text"
        value={value}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
      />
    );
  }
}
