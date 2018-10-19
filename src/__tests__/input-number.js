import React from 'react';
import renderer from 'react-test-renderer';
import InputNumber from '../input-number';

test('value', () => {
  expect(
    renderer.create(<InputNumber value={10} />).toJSON()
  ).toMatchSnapshot();
});
