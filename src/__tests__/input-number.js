import React, { Component } from 'react';
import { mount } from 'enzyme';
import InputNumber, { parseText, changeValue } from '../input-number';

test('parseText', () => {
  expect(parseText('')).toEqual('');
  expect(parseText('-')).toEqual('');
  expect(parseText('-100')).toEqual(-100);
  expect(parseText('0')).toEqual(0);
  expect(parseText('100.')).toEqual(100);
  expect(parseText('0.')).toEqual(0);
  expect(parseText('0.0')).toEqual(0);
  expect(parseText('0.06')).toEqual(0.06);
});

test('parseText with min/max', () => {
  expect(parseText('', { min: 10 })).toEqual('');
  expect(parseText('-', { min: 10 })).toEqual('');
  expect(parseText('10', { min: 100 })).toEqual(100);

  expect(parseText('', { max: 100 })).toEqual('');
  expect(parseText('1000', { max: 100 })).toEqual(100);
});

test('changeValue', () => {
  expect(changeValue('+', 10, { step: 1 })).toEqual(11);
  expect(changeValue('-', 10, { step: 1 })).toEqual(9);

  expect(changeValue('+', 9.7, { step: 0.3 })).toEqual(10);
  expect(changeValue('-', 9.7, { step: 0.3 })).toEqual(9.4);
});

test('InputNumber', () => {
  class App extends Component {
    state = { number: 12 };
    render() {
      return (
        <InputNumber
          value={this.state.number}
          onChange={v => this.setState({ number: v })}
        />
      );
    }
  }

  const wrap = mount(<App />);

  expect(wrap.find(InputNumber).state()).toEqual({
    prev: 12,
    value: 12,
    text: '12'
  });

  wrap.find('input').simulate('change', {
    target: { value: '-' }
  });

  expect(wrap.state().number).toBe('');

  wrap.find('input').simulate('change', {
    target: { value: '-1' }
  });

  expect(wrap.state().number).toBe(-1);

  wrap.find('input').simulate('change', {
    target: { value: '0' }
  });

  expect(wrap.state().number).toBe(0);

  wrap.find('input').simulate('change', {
    target: { value: '0.0' }
  });
  expect(wrap.state().number).toBe(0);

  wrap.find('input').simulate('change', {
    target: { value: '0.06' }
  });

  expect(wrap.state().number).toBe(0.06);

  wrap.setState({ number: -10.2 });

  expect(wrap.find(InputNumber).state()).toEqual({
    prev: -10.2,
    value: -10.2,
    text: '-10.2'
  });
});
