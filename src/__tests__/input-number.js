import { parseText as parse } from '../input-number';

test('empty string', function() {
  expect(parse('')).toStrictEqual('');
  expect(parse('', 1)).toStrictEqual('');
  expect(parse('', 1, 100)).toStrictEqual('');
  expect(parse('', 1, 100, 10)).toStrictEqual('');
});

test('string', function() {
  expect(parse('123.1')).toStrictEqual(123.1);
});

test('integer', function() {
  expect(parse(123)).toStrictEqual(123);
});

test('float', function() {
  expect(parse(123.1)).toStrictEqual(123.1);
});

test('NaN', function() {
  expect(parse('aa')).toStrictEqual('');
});

test('with max', function() {
  expect(parse(120, 1, 100)).toStrictEqual(100);
});

test('with min', function() {
  expect(parse(2.1, 0.1, 100, 10)).toStrictEqual(10);
});

test('step 1', function() {
  expect(parse(2 + 1, 1)).toStrictEqual(3);
  expect(parse(2 - 1, 1)).toStrictEqual(1);
  expect(parse(2.1 + 1, 1)).toStrictEqual(3.1);
  expect(parse(2.1 - 1, 1)).toStrictEqual(1.1);
});

test('step 0.1', function() {
  expect(parse(2 + 0.1, 0.1)).toStrictEqual(2.1);
  expect(parse(2 - 0.1, 0.1)).toStrictEqual(1.9);
  expect(parse(2.1 + 0.1, 0.1)).toStrictEqual(2.2);
  expect(parse(2.1 - 0.1, 0.1)).toStrictEqual(2.0);
});

test('step 0.03', function() {
  expect(parse(73.43 + 0.03, 0.03)).toStrictEqual(73.46);
  expect(parse(73.43 - 0.03, 0.03)).toStrictEqual(73.4);
});
