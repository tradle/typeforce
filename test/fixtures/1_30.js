const tests = require('./tests.js')
const tape = require('tape')
const TYPES = require('../types')

tape('type: "Array<=6(Number)"', t => {
  const { valid, invalid } = tests(t, TYPES['Array<=6(Number)'])
  valid({ value: [] }),
  valid({ value: [ 0 ] }),
  valid({ valueId: 'Array5' }),
  valid({ valueId: 'Array6' })
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got String ""', value: '' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got String "foobar"', value: 'foobar' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 0', value: 0 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 1', value: 1 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 1\\.5', value: 1.5 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 10', value: 10 }),
  invalid({
    exception: 'Expected property "0" of type Number, got String "foobar"',
    value: [ 'foobar' ]
  }),
  invalid({ exception: 'Expected property "0" of type Number, got Object', value: [ { a: 0 } ] }),
  invalid({ exception: 'Expected property "0" of type Number, got null', value: [ null ] }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Boolean false', value: false }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Boolean true', value: true }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got undefined', value: undefined }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got null', value: null }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: {} }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { a: null } }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { a: 0 } }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { a: 0, b: 0 } }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { b: 0 } }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { a: { b: 0 } } }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { a: { b: null } } }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Object',
    value: { a: { b: { c: 0 } } }
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Object',
    value: { a: { b: { c: null } } }
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', value: { a: 'foo', b: 'bar' } }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Object',
    value: { a: 'foo', b: { c: 'bar' } }
  }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Function', valueId: 'function' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got EmptyType', valueId: 'emptyType' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got CustomType', valueId: 'customType' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', valueId: '{ a: undefined }' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', valueId: '{ a: Buffer3 }' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', valueId: '{ a: Buffer10 }' }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Object',
    valueId: '{ a: { b: Buffer3 } }'
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Object',
    valueId: '{ a: { b: Buffer10 } }'
  }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', valueId: '{ x: 1 }' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', valueId: '{ y: 2 }' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Object', valueId: '{ x: 1, y: 2 }' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Array', valueId: 'Array7-N' }),
  invalid({ exception: 'Expected property "0" of type Number, got String "a"', valueId: 'Array6-S' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Array', valueId: 'Array7' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Buffer', valueId: 'Buffer' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Buffer', valueId: 'Buffer3' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Buffer', valueId: 'Buffer10' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got String "boop"', valueId: 'String4' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 1', valueId: 'Finite' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number Infinity', valueId: '+Infinity' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number -Infinity', valueId: '-Infinity' }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got String "fff"', value: 'fff' }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got String "cafe1122deadbeef"',
    value: 'cafe1122deadbeef'
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number -1', value: -1 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 127', value: 127 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 128', value: 128 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 255', value: 255 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 256', value: 256 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number -128', value: -128 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number -129', value: -129 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 65534', value: 65534 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 65535', value: 65535 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 65536', value: 65536 }),
  invalid({ exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 4294967295', value: 4294967295 }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 9007199254740991',
    value: 9007199254740991
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Number 9007199254740994',
    value: 9007199254740994
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Number -9007199254740991',
    value: -9007199254740991
  }),
  invalid({
    exception: 'Expected \\[Number\\]\\{0,6\\}, got Number -9007199254740994',
    value: -9007199254740994
  })
  t.end()
})
