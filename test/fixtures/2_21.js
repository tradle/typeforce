
module.exports = {
  type: false,
  valid: [ { value: false } ],
  invalid: [
    { exception: 'Expected false, got String ""', value: '' },
    {
      exception: 'Expected false, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected false, got Number 0', value: 0 },
    { exception: 'Expected false, got Number 1', value: 1 },
    { exception: 'Expected false, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected false, got Number 10', value: 10 },
    { exception: 'Expected false, got Array', value: [] },
    { exception: 'Expected false, got Array', value: [ 0 ] },
    { exception: 'Expected false, got Array', value: [ 'foobar' ] },
    { exception: 'Expected false, got Array', value: [ { a: 0 } ] },
    { exception: 'Expected false, got Array', value: [ null ] },
    { exception: 'Expected false, got Boolean true', value: true },
    { exception: 'Expected false, got undefined', value: undefined },
    { exception: 'Expected false, got null', value: null },
    { exception: 'Expected false, got Object', value: {} },
    { exception: 'Expected false, got Object', value: { a: null } },
    { exception: 'Expected false, got Object', value: { a: 0 } },
    { exception: 'Expected false, got Object', value: { a: 0, b: 0 } },
    { exception: 'Expected false, got Object', value: { b: 0 } },
    { exception: 'Expected false, got Object', value: { a: { b: 0 } } },
    {
      exception: 'Expected false, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected false, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected false, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected false, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected false, got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected false, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    { exception: 'Expected false, got Function', valueId: 'function' },
    {
      exception: 'Expected false, got EmptyType',
      valueId: 'emptyType'
    },
    {
      exception: 'Expected false, got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected false, got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected false, got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected false, got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected false, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected false, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    { exception: 'Expected false, got Object', valueId: '{ x: 1 }' },
    { exception: 'Expected false, got Object', valueId: '{ y: 2 }' },
    {
      exception: 'Expected false, got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    { exception: 'Expected false, got Array', valueId: 'Array5' },
    { exception: 'Expected false, got Array', valueId: 'Array6' },
    { exception: 'Expected false, got Array', valueId: 'Array7-N' },
    { exception: 'Expected false, got Array', valueId: 'Array6-S' },
    { exception: 'Expected false, got Array', valueId: 'Array7' },
    { exception: 'Expected false, got Buffer', valueId: 'Buffer' },
    { exception: 'Expected false, got Buffer', valueId: 'Buffer3' },
    { exception: 'Expected false, got Buffer', valueId: 'Buffer10' },
    {
      exception: 'Expected false, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected false, got String "fff"', value: 'fff' },
    {
      exception: 'Expected false, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected false, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected false, got Number -1', value: -1 },
    { exception: 'Expected false, got Number 127', value: 127 },
    { exception: 'Expected false, got Number 128', value: 128 },
    { exception: 'Expected false, got Number 255', value: 255 },
    { exception: 'Expected false, got Number 256', value: 256 },
    { exception: 'Expected false, got Number -128', value: -128 },
    { exception: 'Expected false, got Number -129', value: -129 },
    { exception: 'Expected false, got Number 65534', value: 65534 },
    { exception: 'Expected false, got Number 65535', value: 65535 },
    { exception: 'Expected false, got Number 65536', value: 65536 },
    {
      exception: 'Expected false, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected false, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected false, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected false, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected false, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}