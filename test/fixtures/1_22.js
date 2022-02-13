const tests = require('./tests.js')
const tape = require('tape')
const TYPES = require('../types')

tape('type: "{ Letter: Number }"', t => {
  const { valid, invalid } = tests(t, TYPES['{ Letter: Number }'])
  valid({ value: [] }),
  valid({ value: {} }),
  valid({ value: { a: 0 } }),
  valid({ value: { a: 0, b: 0 } }),
  valid({ value: { b: 0 } }),
  valid({ valueId: 'emptyType' }),
  valid({ valueId: 'customType' }),
  valid({ valueId: '{ x: 1 }' }),
  valid({ valueId: '{ y: 2 }' }),
  valid({ valueId: '{ x: 1, y: 2 }' })
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got String ""', value: '' }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got String "foobar"', value: 'foobar' }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 0', value: 0 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 1', value: 1 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 1\\.5', value: 1.5 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 10', value: 10 }),
  invalid({ exception: 'Expected property "0" with key type Letter, got String "0"', value: [ 0 ] }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    value: [ 'foobar' ]
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    value: [ { a: 0 } ]
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    value: [ null ]
  }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Boolean false', value: false }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Boolean true', value: true }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got undefined', value: undefined }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got null', value: null }),
  invalid({ exception: 'Expected property "a" of type Number, got null', value: { a: null } }),
  invalid({ exception: 'Expected property "a" of type Number, got Object', value: { a: { b: 0 } } }),
  invalid({
    exception: 'Expected property "a" of type Number, got Object',
    value: { a: { b: null } }
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Object',
    value: { a: { b: { c: 0 } } }
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Object',
    value: { a: { b: { c: null } } }
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got String "foo"',
    value: { a: 'foo', b: 'bar' }
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got String "foo"',
    value: { a: 'foo', b: { c: 'bar' } }
  }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Function', valueId: 'function' }),
  invalid({
    exception: 'Expected property "a" of type Number, got undefined',
    valueId: '{ a: undefined }'
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Buffer',
    valueId: '{ a: Buffer3 }'
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Buffer',
    valueId: '{ a: Buffer10 }'
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Object',
    valueId: '{ a: { b: Buffer3 } }'
  }),
  invalid({
    exception: 'Expected property "a" of type Number, got Object',
    valueId: '{ a: { b: Buffer10 } }'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Array5'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Array6'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Array7-N'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Array6-S'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Array7'
  }),
  invalid({
    exception: 'Expected property "readBigUInt64LE" with key type Letter, got String "readBigUInt64LE"',
    valueId: 'Buffer'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Buffer3'
  }),
  invalid({
    exception: 'Expected property "0" with key type Letter, got String "0"',
    valueId: 'Buffer10'
  }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got String "boop"', valueId: 'String4' }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got String "fff"', value: 'fff' }),
  invalid({
    exception: 'Expected \\{Letter\\: Number\\}, got String "cafe1122deadbeef"',
    value: 'cafe1122deadbeef'
  }),
  invalid({
    exception: 'Expected \\{Letter\\: Number\\}, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number -1', value: -1 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 127', value: 127 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 128', value: 128 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 255', value: 255 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 256', value: 256 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number -128', value: -128 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number -129', value: -129 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 65534', value: 65534 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 65535', value: 65535 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 65536', value: 65536 }),
  invalid({ exception: 'Expected \\{Letter\\: Number\\}, got Number 4294967295', value: 4294967295 }),
  invalid({
    exception: 'Expected \\{Letter\\: Number\\}, got Number 9007199254740991',
    value: 9007199254740991
  }),
  invalid({
    exception: 'Expected \\{Letter\\: Number\\}, got Number 9007199254740994',
    value: 9007199254740994
  }),
  invalid({
    exception: 'Expected \\{Letter\\: Number\\}, got Number -9007199254740991',
    value: -9007199254740991
  }),
  invalid({
    exception: 'Expected \\{Letter\\: Number\\}, got Number -9007199254740994',
    value: -9007199254740994
  })
  t.end()
})
