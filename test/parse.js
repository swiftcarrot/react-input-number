var assert = require('assert');
var parse = require('../lib/parse');

describe('parse', function() {
  it('empty string', function() {
    assert.strictEqual(parse(''), '');
    assert.strictEqual(parse('', 1), '');
    assert.strictEqual(parse('', 1, 100), '');
    assert.strictEqual(parse('', 1, 100, 10), '');
  });

  it('string', function() {
    assert.strictEqual(parse('123.1'), 123.1);
  });

  it('integer', function() {
    assert.strictEqual(parse(123), 123);
  });

  it('float', function() {
    assert.strictEqual(parse(123.1), 123.1);
  });

  it('NaN', function() {
    assert.strictEqual(parse('aa'), '');
  });

  it('with max', function() {
    assert.strictEqual(parse(120, 1, 100), 100);
  });

  it('with min', function() {
    assert.strictEqual(parse(2.1, 0.1, 100, 10), 10);
  });

  it('step 1', function() {
    assert.strictEqual(parse(2+1, 1), 3);
    assert.strictEqual(parse(2-1, 1), 1);
    assert.strictEqual(parse(2.1+1, 1), 3.1);
    assert.strictEqual(parse(2.1-1, 1), 1.1);
  });

  it('step 0.1', function() {
    assert.strictEqual(parse(2+0.1, 0.1), 2.1);
    assert.strictEqual(parse(2-0.1, 0.1), 1.9);
    assert.strictEqual(parse(2.1+0.1, 0.1), 2.2);
    assert.strictEqual(parse(2.1-0.1, 0.1), 2.0);
  });

  it('step 0.03', function() {
    assert.strictEqual(parse(73.43+0.03, 0.03), 73.46);
    assert.strictEqual(parse(73.43-0.03, 0.03), 73.40);
  });
});