import { parseText } from '../input-number';

test('empty string', function() {
  expect(parseText('')).toStrictEqual('');
  expect(parseText('', 1)).toStrictEqual('');
  expect(parseText('', 1, 100)).toStrictEqual('');
  expect(parseText('', 1, 100, 10)).toStrictEqual('');
});

test('string', function() {
  expect(parseText('123.1')).toStrictEqual(123.1);
});

test('integer', function() {
  expect(parseText(123)).toStrictEqual(123);
});

test('float', function() {
  expect(parseText(123.1)).toStrictEqual(123.1);
});

test('NaN', function() {
  expect(parseText('aa')).toStrictEqual('');
});

test('with max', function() {
  expect(parseText(120, 1, 100)).toStrictEqual(100);
});

test('with min', function() {
  expect(parseText(2.1, 0.1, 100, 10)).toStrictEqual(10);
});

test('step 1', function() {
  expect(parseText(2 + 1, 1)).toStrictEqual(3);
  expect(parseText(2 - 1, 1)).toStrictEqual(1);
  expect(parseText(2.1 + 1, 1)).toStrictEqual(3.1);
  expect(parseText(2.1 - 1, 1)).toStrictEqual(1.1);
});

test('step 0.1', function() {
  expect(parseText(2 + 0.1, 0.1)).toStrictEqual(2.1);
  expect(parseText(2 - 0.1, 0.1)).toStrictEqual(1.9);
  expect(parseText(2.1 + 0.1, 0.1)).toStrictEqual(2.2);
  expect(parseText(2.1 - 0.1, 0.1)).toStrictEqual(2.0);
});

test('step 0.03', function() {
  expect(parseText(73.43 + 0.03, 0.03)).toStrictEqual(73.46);
  expect(parseText(73.43 - 0.03, 0.03)).toStrictEqual(73.4);
});
