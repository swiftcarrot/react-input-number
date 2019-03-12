/** @jsx jsx */
import { jsx } from '@emotion/core';
import isNaN from 'lodash/isNaN';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { useState, useEffect } from 'react';

const KEY_UP = 38;
const KEY_DOWN = 40;

const InputNumber = ({
  step,
  min,
  max,
  value,
  onChange,
  onKeyDown,
  ...props
}) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  function handleChange(e) {
    const text = e.target.value;
    const value = parseText(text);

    setText(text);
    if (onChange) {
      onChange(value);
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === KEY_UP) {
      up();
    } else if (e.keyCode === KEY_DOWN) {
      down();
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  function up() {
    if (onChange) {
      onChange(changeValue('+', value, max, min, step));
    }
  }

  function down() {
    if (onChange) {
      onChange(changeValue('-', value, max, min, step));
    }
  }

  return (
    <input
      {...props}
      css={{
        MozAppearance: 'textfield',
        '&::-webkit-inner-spin-button, &::::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0
        }
      }}
      type="number"
      step={step}
      min={min}
      max={max}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

InputNumber.defaultProps = {
  autoComplete: 'off',
  value: '',
  step: 1
};

export function parseText(text) {
  if (isNumber(text)) return text;

  if (isString(text)) {
    text = text.trim();

    if (!text) return '';
    const num = parseFloat(text);

    if (!isNaN(num)) {
      return num;
    }
  }

  return '';
}

export function changeValue(mod, value, max, min, step) {
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

export default InputNumber;
