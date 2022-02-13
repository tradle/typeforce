const tests = require('./tests.js')
const tape = require('tape')
const TYPES = require('../types')

tape('type: "Array7"', t => {
  const { valid, invalid } = tests(t, TYPES['Array7'])
  valid({ valueId: 'Array7-N' }),
  valid({ valueId: 'Array7' })
  invalid({ exception: 'Expected Array, got String ""', value: '' }),
  invalid({ exception: 'Expected Array, got String "foobar"', value: 'foobar' }),
  invalid({ exception: 'Expected Array, got Number 0', value: 0 }),
  invalid({ exception: 'Expected Array, got Number 1', value: 1 }),
  invalid({ exception: 'Expected Array, got Number 1\\.5', value: 1.5 }),
  invalid({ exception: 'Expected Array, got Number 10', value: 10 }),
  invalid({ exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 0\\)', value: [] }),
  invalid({ exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 1\\)', value: [ 0 ] }),
  invalid({
    exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 1\\)',
    value: [ 'foobar' ]
  }),
  invalid({
    exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 1\\)',
    value: [ { a: 0 } ]
  }),
  invalid({
    exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 1\\)',
    value: [ null ]
  }),
  invalid({ exception: 'Expected Array, got Boolean false', value: false }),
  invalid({ exception: 'Expected Array, got Boolean true', value: true }),
  invalid({ exception: 'Expected Array, got undefined', value: undefined }),
  invalid({ exception: 'Expected Array, got null', value: null }),
  invalid({ exception: 'Expected Array, got Object', value: {} }),
  invalid({ exception: 'Expected Array, got Object', value: { a: null } }),
  invalid({ exception: 'Expected Array, got Object', value: { a: 0 } }),
  invalid({ exception: 'Expected Array, got Object', value: { a: 0, b: 0 } }),
  invalid({ exception: 'Expected Array, got Object', value: { b: 0 } }),
  invalid({ exception: 'Expected Array, got Object', value: { a: { b: 0 } } }),
  invalid({ exception: 'Expected Array, got Object', value: { a: { b: null } } }),
  invalid({
    exception: 'Expected Array, got Object',
    value: { a: { b: { c: 0 } } }
  }),
  invalid({
    exception: 'Expected Array, got Object',
    value: { a: { b: { c: null } } }
  }),
  invalid({
    exception: 'Expected Array, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  invalid({ exception: 'Expected Array, got Object', value: { a: 'foo', b: 'bar' } }),
  invalid({ exception: 'Expected Array, got Object', value: { a: 'foo', b: { c: 'bar' } } }),
  invalid({ exception: 'Expected Array, got Function', valueId: 'function' }),
  invalid({ exception: 'Expected Array, got EmptyType', valueId: 'emptyType' }),
  invalid({ exception: 'Expected Array, got CustomType', valueId: 'customType' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ a: undefined }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ a: Buffer3 }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ a: Buffer10 }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ a: { b: Buffer3 } }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ a: { b: Buffer10 } }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ x: 1 }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ y: 2 }' }),
  invalid({ exception: 'Expected Array, got Object', valueId: '{ x: 1, y: 2 }' }),
  invalid({
    exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 5\\)',
    valueId: 'Array5'
  }),
  invalid({
    exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 6\\)',
    valueId: 'Array6'
  }),
  invalid({
    exception: 'Expected Array\\(Length\\: 7\\), got Array\\(Length\\: 6\\)',
    valueId: 'Array6-S'
  }),
  invalid({ exception: 'Expected Array, got Buffer', valueId: 'Buffer' }),
  invalid({ exception: 'Expected Array, got Buffer', valueId: 'Buffer3' }),
  invalid({ exception: 'Expected Array, got Buffer', valueId: 'Buffer10' }),
  invalid({ exception: 'Expected Array, got String "boop"', valueId: 'String4' }),
  invalid({ exception: 'Expected Array, got String "fff"', value: 'fff' }),
  invalid({ exception: 'Expected Array, got String "cafe1122deadbeef"', value: 'cafe1122deadbeef' }),
  invalid({
    exception: 'Expected Array, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  }),
  invalid({ exception: 'Expected Array, got Number -1', value: -1 }),
  invalid({ exception: 'Expected Array, got Number 127', value: 127 }),
  invalid({ exception: 'Expected Array, got Number 128', value: 128 }),
  invalid({ exception: 'Expected Array, got Number 255', value: 255 }),
  invalid({ exception: 'Expected Array, got Number 256', value: 256 }),
  invalid({ exception: 'Expected Array, got Number -128', value: -128 }),
  invalid({ exception: 'Expected Array, got Number -129', value: -129 }),
  invalid({ exception: 'Expected Array, got Number 65534', value: 65534 }),
  invalid({ exception: 'Expected Array, got Number 65535', value: 65535 }),
  invalid({ exception: 'Expected Array, got Number 65536', value: 65536 }),
  invalid({ exception: 'Expected Array, got Number 4294967295', value: 4294967295 }),
  invalid({ exception: 'Expected Array, got Number 9007199254740991', value: 9007199254740991 }),
  invalid({ exception: 'Expected Array, got Number 9007199254740994', value: 9007199254740994 }),
  invalid({ exception: 'Expected Array, got Number -9007199254740991', value: -9007199254740991 }),
  invalid({ exception: 'Expected Array, got Number -9007199254740994', value: -9007199254740994 })
  t.end()
})
