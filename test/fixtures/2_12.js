const tests = require('./tests.js')
const tape = require('tape')

tape('type: {}', t => {
  const { valid, invalid } = tests(t, {})
  valid({ value: [] }),
  valid({ value: [ 0 ] }),
  valid({ value: [ 'foobar' ] }),
  valid({ value: [ { a: 0 } ] }),
  valid({ value: [ null ] }),
  valid({ value: {} }),
  valid({ value: { a: null } }),
  valid({ value: { a: 0 } }),
  valid({ value: { a: 0, b: 0 } }),
  valid({ value: { b: 0 } }),
  valid({ value: { a: { b: 0 } } }),
  valid({ value: { a: { b: null } } }),
  valid({
    value: { a: { b: { c: 0 } } }
  }),
  valid({
    value: { a: { b: { c: null } } }
  }),
  valid({
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  valid({ value: { a: 'foo', b: 'bar' } }),
  valid({ value: { a: 'foo', b: { c: 'bar' } } }),
  valid({ valueId: 'emptyType' }),
  valid({ valueId: 'customType' }),
  valid({ valueId: '{ a: undefined }' }),
  valid({ valueId: '{ a: Buffer3 }' }),
  valid({ valueId: '{ a: Buffer10 }' }),
  valid({ valueId: '{ a: { b: Buffer3 } }' }),
  valid({ valueId: '{ a: { b: Buffer10 } }' }),
  valid({ valueId: '{ x: 1 }' }),
  valid({ valueId: '{ y: 2 }' }),
  valid({ valueId: '{ x: 1, y: 2 }' }),
  valid({ valueId: 'Array5' }),
  valid({ valueId: 'Array6' }),
  valid({ valueId: 'Array7-N' }),
  valid({ valueId: 'Array6-S' }),
  valid({ valueId: 'Array7' }),
  valid({ valueId: 'Buffer' }),
  valid({ valueId: 'Buffer3' }),
  valid({ valueId: 'Buffer10' })
  invalid({ exception: 'Expected Object, got String ""', value: '' }),
  invalid({ exception: 'Expected Object, got String "foobar"', value: 'foobar' }),
  invalid({ exception: 'Expected Object, got Number 0', value: 0 }),
  invalid({ exception: 'Expected Object, got Number 1', value: 1 }),
  invalid({ exception: 'Expected Object, got Number 1\\.5', value: 1.5 }),
  invalid({ exception: 'Expected Object, got Number 10', value: 10 }),
  invalid({ exception: 'Unexpected property "0"', strict: true, value: [ 0 ] }),
  invalid({ exception: 'Unexpected property "0"', strict: true, value: [ 'foobar' ] }),
  invalid({ exception: 'Unexpected property "0"', strict: true, value: [ { a: 0 } ] }),
  invalid({ exception: 'Unexpected property "0"', strict: true, value: [ null ] }),
  invalid({ exception: 'Expected Object, got Boolean false', value: false }),
  invalid({ exception: 'Expected Object, got Boolean true', value: true }),
  invalid({ exception: 'Expected Object, got undefined', value: undefined }),
  invalid({ exception: 'Expected Object, got null', value: null }),
  invalid({ exception: 'Unexpected property "a"', strict: true, value: { a: null } }),
  invalid({ exception: 'Unexpected property "a"', strict: true, value: { a: 0 } }),
  invalid({ exception: 'Unexpected property "a"', strict: true, value: { a: 0, b: 0 } }),
  invalid({ exception: 'Unexpected property "b"', strict: true, value: { b: 0 } }),
  invalid({ exception: 'Unexpected property "a"', strict: true, value: { a: { b: 0 } } }),
  invalid({ exception: 'Unexpected property "a"', strict: true, value: { a: { b: null } } }),
  invalid({
    exception: 'Unexpected property "a"',
    strict: true,
    value: { a: { b: { c: 0 } } }
  }),
  invalid({
    exception: 'Unexpected property "a"',
    strict: true,
    value: { a: { b: { c: null } } }
  }),
  invalid({
    exception: 'Unexpected property "a"',
    strict: true,
    value: { a: { b: { c: 0, d: 0 } } }
  }),
  invalid({ exception: 'Unexpected property "a"', strict: true, value: { a: 'foo', b: 'bar' } }),
  invalid({
    exception: 'Unexpected property "a"',
    strict: true,
    value: { a: 'foo', b: { c: 'bar' } }
  }),
  invalid({ exception: 'Expected Object, got Function', valueId: 'function' }),
  invalid({ exception: 'Unexpected property "x"', strict: true, valueId: 'customType' }),
  invalid({ exception: 'Unexpected property "a"', strict: true, valueId: '{ a: undefined }' }),
  invalid({ exception: 'Unexpected property "a"', strict: true, valueId: '{ a: Buffer3 }' }),
  invalid({ exception: 'Unexpected property "a"', strict: true, valueId: '{ a: Buffer10 }' }),
  invalid({ exception: 'Unexpected property "a"', strict: true, valueId: '{ a: { b: Buffer3 } }' }),
  invalid({ exception: 'Unexpected property "a"', strict: true, valueId: '{ a: { b: Buffer10 } }' }),
  invalid({ exception: 'Unexpected property "x"', strict: true, valueId: '{ x: 1 }' }),
  invalid({ exception: 'Unexpected property "y"', strict: true, valueId: '{ y: 2 }' }),
  invalid({ exception: 'Unexpected property "x"', strict: true, valueId: '{ x: 1, y: 2 }' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Array5' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Array6' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Array7-N' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Array6-S' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Array7' }),
  invalid({ exception: 'Unexpected property "readBigUInt64LE"', strict: true, valueId: 'Buffer' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Buffer3' }),
  invalid({ exception: 'Unexpected property "0"', strict: true, valueId: 'Buffer10' }),
  invalid({ exception: 'Expected Object, got String "boop"', valueId: 'String4' }),
  invalid({ exception: 'Expected Object, got String "fff"', value: 'fff' }),
  invalid({ exception: 'Expected Object, got String "cafe1122deadbeef"', value: 'cafe1122deadbeef' }),
  invalid({
    exception: 'Expected Object, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  }),
  invalid({ exception: 'Expected Object, got Number -1', value: -1 }),
  invalid({ exception: 'Expected Object, got Number 127', value: 127 }),
  invalid({ exception: 'Expected Object, got Number 128', value: 128 }),
  invalid({ exception: 'Expected Object, got Number 255', value: 255 }),
  invalid({ exception: 'Expected Object, got Number 256', value: 256 }),
  invalid({ exception: 'Expected Object, got Number -128', value: -128 }),
  invalid({ exception: 'Expected Object, got Number -129', value: -129 }),
  invalid({ exception: 'Expected Object, got Number 65534', value: 65534 }),
  invalid({ exception: 'Expected Object, got Number 65535', value: 65535 }),
  invalid({ exception: 'Expected Object, got Number 65536', value: 65536 }),
  invalid({ exception: 'Expected Object, got Number 4294967295', value: 4294967295 }),
  invalid({ exception: 'Expected Object, got Number 9007199254740991', value: 9007199254740991 }),
  invalid({ exception: 'Expected Object, got Number 9007199254740994', value: 9007199254740994 }),
  invalid({ exception: 'Expected Object, got Number -9007199254740991', value: -9007199254740991 }),
  invalid({ exception: 'Expected Object, got Number -9007199254740994', value: -9007199254740994 })
  t.end()
})
