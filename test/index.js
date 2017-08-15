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
