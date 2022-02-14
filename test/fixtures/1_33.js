const tests = require('./tests.js')
const tape = require('fresh-tape')
const TYPES = require('../types')

tape('type: "Buffer0"', t => {
  const { valid, invalid } = tests(t, TYPES['Buffer0'])
  valid({ valueId: 'Buffer' })
  invalid({ exception: 'Expected Buffer, got String ""', value: '' }),
  invalid({ exception: 'Expected Buffer, got String "foobar"', value: 'foobar' }),
  invalid({ exception: 'Expected Buffer, got Number 0', value: 0 }),
  invalid({ exception: 'Expected Buffer, got Number 1', value: 1 }),
  invalid({ exception: 'Expected Buffer, got Number 1\\.5', value: 1.5 }),
  invalid({ exception: 'Expected Buffer, got Number 10', value: 10 }),
  invalid({ exception: 'Expected Buffer, got Array', value: [] }),
  invalid({ exception: 'Expected Buffer, got Array', value: [ 0 ] }),
  invalid({ exception: 'Expected Buffer, got Array', value: [ 'foobar' ] }),
  invalid({ exception: 'Expected Buffer, got Array', value: [ { a: 0 } ] }),
  invalid({ exception: 'Expected Buffer, got Array', value: [ null ] }),
  invalid({ exception: 'Expected Buffer, got Boolean false', value: false }),
  invalid({ exception: 'Expected Buffer, got Boolean true', value: true }),
  invalid({ exception: 'Expected Buffer, got undefined', value: undefined }),
  invalid({ exception: 'Expected Buffer, got null', value: null }),
  invalid({ exception: 'Expected Buffer, got Object', value: {} }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: null } }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: 0 } }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: 0, b: 0 } }),
  invalid({ exception: 'Expected Buffer, got Object', value: { b: 0 } }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: { b: 0 } } }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: { b: null } } }),
  invalid({
    exception: 'Expected Buffer, got Object',
    value: { a: { b: { c: 0 } } }
  }),
  invalid({
    exception: 'Expected Buffer, got Object',
    value: { a: { b: { c: null } } }
  }),
  invalid({
    exception: 'Expected Buffer, got Object',
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: 'foo', b: 'bar' } }),
  invalid({ exception: 'Expected Buffer, got Object', value: { a: 'foo', b: { c: 'bar' } } }),
  invalid({ exception: 'Expected Buffer, got Function', valueId: 'function' }),
  invalid({ exception: 'Expected Buffer, got EmptyType', valueId: 'emptyType' }),
  invalid({ exception: 'Expected Buffer, got CustomType', valueId: 'customType' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ a: undefined }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ a: Buffer3 }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ a: Buffer10 }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ a: { b: Buffer3 } }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ a: { b: Buffer10 } }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ x: 1 }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ y: 2 }' }),
  invalid({ exception: 'Expected Buffer, got Object', valueId: '{ x: 1, y: 2 }' }),
  invalid({ exception: 'Expected Buffer, got Array', valueId: 'Array5' }),
  invalid({ exception: 'Expected Buffer, got Array', valueId: 'Array6' }),
  invalid({ exception: 'Expected Buffer, got Array', valueId: 'Array7-N' }),
  invalid({ exception: 'Expected Buffer, got Array', valueId: 'Array6-S' }),
  invalid({ exception: 'Expected Buffer, got Array', valueId: 'Array7' }),
  invalid({
    exception: 'Expected Buffer\\(Length\\: 0\\), got Buffer\\(Length\\: 3\\)',
    valueId: 'Buffer3'
  }),
  invalid({
    exception: 'Expected Buffer\\(Length\\: 0\\), got Buffer\\(Length\\: 10\\)',
    valueId: 'Buffer10'
  }),
  invalid({ exception: 'Expected Buffer, got String "boop"', valueId: 'String4' }),
  invalid({ exception: 'Expected Buffer, got Number 1', valueId: 'Finite' }),
  invalid({ exception: 'Expected Buffer, got Number Infinity', valueId: '+Infinity' }),
  invalid({ exception: 'Expected Buffer, got Number -Infinity', valueId: '-Infinity' }),
  invalid({ exception: 'Expected Buffer, got String "fff"', value: 'fff' }),
  invalid({ exception: 'Expected Buffer, got String "cafe1122deadbeef"', value: 'cafe1122deadbeef' }),
  invalid({
    exception: 'Expected Buffer, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  }),
  invalid({ exception: 'Expected Buffer, got Number -1', value: -1 }),
  invalid({ exception: 'Expected Buffer, got Number 127', value: 127 }),
  invalid({ exception: 'Expected Buffer, got Number 128', value: 128 }),
  invalid({ exception: 'Expected Buffer, got Number 255', value: 255 }),
  invalid({ exception: 'Expected Buffer, got Number 256', value: 256 }),
  invalid({ exception: 'Expected Buffer, got Number -128', value: -128 }),
  invalid({ exception: 'Expected Buffer, got Number -129', value: -129 }),
  invalid({ exception: 'Expected Buffer, got Number 65534', value: 65534 }),
  invalid({ exception: 'Expected Buffer, got Number 65535', value: 65535 }),
  invalid({ exception: 'Expected Buffer, got Number 65536', value: 65536 }),
  invalid({ exception: 'Expected Buffer, got Number 4294967295', value: 4294967295 }),
  invalid({ exception: 'Expected Buffer, got Number 9007199254740991', value: 9007199254740991 }),
  invalid({ exception: 'Expected Buffer, got Number 9007199254740994', value: 9007199254740994 }),
  invalid({ exception: 'Expected Buffer, got Number -9007199254740991', value: -9007199254740991 }),
  invalid({ exception: 'Expected Buffer, got Number -9007199254740994', value: -9007199254740994 })
  t.end()
})
