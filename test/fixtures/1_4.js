const tests = require('./tests.js')
const tape = require('fresh-tape')
const TYPES = require('../types')

tape('type: "Boolean|Number|String"', t => {
  const { valid, invalid } = tests(t, TYPES['Boolean|Number|String'])
  valid({ value: '' }),
  valid({ value: 'foobar' }),
  valid({ value: 0 }),
  valid({ value: 1 }),
  valid({ value: 1.5 }),
  valid({ value: 10 }),
  valid({ value: false }),
  valid({ value: true }),
  valid({ valueId: 'String4' }),
  valid({ valueId: 'Finite' }),
  valid({ valueId: '+Infinity' }),
  valid({ valueId: '-Infinity' }),
  valid({ value: 'fff' }),
  valid({ value: 'cafe1122deadbeef' }),
  valid({ value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20' }),
  valid({ value: -1 }),
  valid({ value: 127 }),
  valid({ value: 128 }),
  valid({ value: 255 }),
  valid({ value: 256 }),
  valid({ value: -128 }),
  valid({ value: -129 }),
  valid({ value: 65534 }),
  valid({ value: 65535 }),
  valid({ value: 65536 }),
  valid({ value: 4294967295 }),
  valid({ value: 9007199254740991 }),
  valid({ value: 9007199254740994 }),
  valid({ value: -9007199254740991 }),
  valid({ value: -9007199254740994 })
  invalid({ exception: 'Expected Boolean|Number|String, got Array', value: [] }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', value: [ 0 ] }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', value: [ 'foobar' ] }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', value: [ { a: 0 } ] }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', value: [ null ] }),
  invalid({ exception: 'Expected Boolean|Number|String, got undefined', value: undefined }),
  invalid({ exception: 'Expected Boolean|Number|String, got null', value: null }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: {} }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { a: null } }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { a: 0 } }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { a: 0, b: 0 } }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { b: 0 } }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { a: { b: 0 } } }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { a: { b: null } } }),
  invalid({
    exception: 'Expected Boolean|Number|String, got Object',
    value: { a: { b: { c: 0 } } }
  }),
  invalid({
    exception: 'Expected Boolean|Number|String, got Object',
    value: { a: { b: { c: null } } }
  }),
  invalid({
    exception: 'Expected Boolean|Number|String, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', value: { a: 'foo', b: 'bar' } }),
  invalid({
    exception: 'Expected Boolean|Number|String, got Object',
    value: { a: 'foo', b: { c: 'bar' } }
  }),
  invalid({ exception: 'Expected Boolean|Number|String, got Function', valueId: 'function' }),
  invalid({ exception: 'Expected Boolean|Number|String, got EmptyType', valueId: 'emptyType' }),
  invalid({ exception: 'Expected Boolean|Number|String, got CustomType', valueId: 'customType' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', valueId: '{ a: undefined }' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', valueId: '{ a: Buffer3 }' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', valueId: '{ a: Buffer10 }' }),
  invalid({
    exception: 'Expected Boolean|Number|String, got Object',
    valueId: '{ a: { b: Buffer3 } }'
  }),
  invalid({
    exception: 'Expected Boolean|Number|String, got Object',
    valueId: '{ a: { b: Buffer10 } }'
  }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', valueId: '{ x: 1 }' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', valueId: '{ y: 2 }' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Object', valueId: '{ x: 1, y: 2 }' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', valueId: 'Array5' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', valueId: 'Array6' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', valueId: 'Array7-N' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', valueId: 'Array6-S' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Array', valueId: 'Array7' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Buffer', valueId: 'Buffer' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Buffer', valueId: 'Buffer3' }),
  invalid({ exception: 'Expected Boolean|Number|String, got Buffer', valueId: 'Buffer10' })
  t.end()
})
