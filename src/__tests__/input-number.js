import React, { Component } from 'react';
import renderer from 'react-test-renderer';
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

test('changeValue', () => {
  expect(changeValue('+', '')).toEqual('');
  expect(changeValue('+', '', null, 10, null)).toEqual(10);

  expect(changeValue('+', 10, null, null, 1)).toEqual(11);
  expect(changeValue('-', 10, null, null, 1)).toEqual(9);

  expect(changeValue('+', 9.7, null, null, 0.3)).toEqual(10);
  expect(changeValue('-', 9.7, null, null, 0.3)).toEqual(9.4);
});

test('render', () => {
  expect(renderer.create(<InputNumber />).toJSON()).toMatchInlineSnapshot(`
    <input
      autoComplete="off"
      className="css-1j3bwou"
      onChange={[Function]}
      onKeyDown={[Function]}
      onWheel={[Function]}
      type="text"
      value=""
    />
  `);

  expect(renderer.create(<InputNumber enableMobileNumericKeyboard />).toJSON())
    .toMatchInlineSnapshot(`
    <input
      autoComplete="off"
      className="css-1j3bwou"
      inputMode="numeric"
      onChange={[Function]}
      onKeyDown={[Function]}
      onWheel={[Function]}
      pattern=""
      step={1}
      type="number"
      value=""
    />
  `);
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

  wrap.find('input').simulate('change', { target: { value: '-' } });
  expect(wrap.state().number).toBe('');

  wrap.find('input').simulate('change', { target: { value: '-1' } });
  expect(wrap.state().number).toBe(-1);

  wrap.find('input').simulate('change', { target: { value: '0' } });
  expect(wrap.state().number).toBe(0);

  wrap.find('input').simulate('change', { target: { value: '0.0' } });
  expect(wrap.state().number).toBe(0);

  wrap.find('input').simulate('change', { target: { value: '0.06' } });
  expect(wrap.state().number).toBe(0.06);

  wrap.find('input').simulate('keydown', { keyCode: 38 });
  setTimeout(() => {
    expect(wrap.state().number).toBe(1.06);
  }, 10);

  wrap.find('input').simulate('keydown', { keyCode: 40 });
  setTimeout(() => {
    expect(wrap.state().number).toBe(-0.94);
  }, 10);

  wrap.setState({ number: -10.2 });
  setTimeout(() => {
    expect(wrap.find('input').props().value).toBe(-10.2);
  }, 10);
});
