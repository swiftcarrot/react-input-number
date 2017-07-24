const blacklist = require('blacklist');
const React = require('react');
const parseNumber = require('./parse');

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

class InputNumber extends React.Component {
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

  handleKeyDown(e) {
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

  handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
      this.change(this.state.value);
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const props = blacklist(
      this.props,
      'step',
      'min',
      'max',
      'onKeyUp',
      'onKeyDown',
      'onChange'
    );
    const { value } = this.state;

    return (
      <input
        {...props}
        type="text"
        value={value}
        onKeyUp={e => this.handleKeyUp(e)}
        onKeyDown={e => this.handleKeyDown(e)}
        onChange={e => this.handleChange(e)}
      />
    );
  }
}

InputNumber.defaultProps = {
  step: 1
};

module.exports = InputNumber;
