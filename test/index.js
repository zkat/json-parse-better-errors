'use strict'

const test = require('tap').test

const parseJson = require('..')

test('parses JSON', t => {
  const data = JSON.stringify({
    foo: 1,
    bar: {
      baz: [1, 2, 3, 'four']
    }
  })
  t.deepEqual(JSON.parse(data), parseJson(data), 'does the same thing')
  t.done()
})

test('throws SyntaxError for unexpected token', t => {
  const data = 'foo'
  t.throws(
    () => parseJson(data),
    new SyntaxError('Unexpected token o in JSON at position 1 while parsing near \'foo\'')
  )
  t.done()
})

test('throws SyntaxError for unexpected end of JSON', t => {
  const data = '{"foo: bar}'
  t.throws(
    () => parseJson(data),
    new SyntaxError('Unexpected end of JSON input while parsing near \'{"foo: bar}\'')
  )
  t.done()
})

test('throws SyntaxError for unexpected number', t => {
  const data = '[[1,2],{3,3,3,3,3}]'
  t.throws(
    () => parseJson(data),
    new SyntaxError('Unexpected number in JSON at position 8')
  )
  t.done()
})

test('SyntaxError with less context (limited start)', t => {
  const data = '{"6543210'
  t.throws(
    () => parseJson(data, null, 3),
    new SyntaxError('Unexpected end of JSON input while parsing near \'...3210\''))
  t.done()
})

test('SyntaxError with less context (limited end)', t => {
  const data = 'abcde'
  t.throws(
    () => parseJson(data, null, 2),
    new SyntaxError('Unexpected token a in JSON at position 0 while parsing near \'ab...\''))
  t.done()
})

test('throws TypeError for undefined', t => {
  t.throws(
    () => parseJson(undefined),
    new TypeError('Cannot parse undefined')
  )
  t.done()
})

test('throws TypeError for non-strings', t => {
  t.throws(
    () => parseJson(new Map()),
    new TypeError('Cannot parse [object Map]')
  )
  t.done()
})

test('throws TypeError for empty arrays', t => {
  t.throws(
    () => parseJson([]),
    new TypeError('Cannot parse an empty array')
  )
  t.done()
})
