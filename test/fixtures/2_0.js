
module.exports = {
  type: 'Array',
  valid: [
    { value: [] },
    { value: [ 0 ] },
    { value: [ 'foobar' ] },
    { value: [ { a: 0 } ] },
    { value: [ null ] },
    { valueId: 'Array5' },
    { valueId: 'Array6' },
    { valueId: 'Array7-N' },
    { valueId: 'Array6-S' },
    { valueId: 'Array7' }
  ],
  invalid: [
    { exception: 'Expected Array, got String ""', value: '' },
    {
      exception: 'Expected Array, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected Array, got Number 0', value: 0 },
    { exception: 'Expected Array, got Number 1', value: 1 },
    { exception: 'Expected Array, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected Array, got Number 10', value: 10 },
    { exception: 'Expected Array, got Boolean false', value: false },
    { exception: 'Expected Array, got Boolean true', value: true },
    { exception: 'Expected Array, got undefined', value: undefined },
    { exception: 'Expected Array, got null', value: null },
    { exception: 'Expected Array, got Object', value: {} },
    { exception: 'Expected Array, got Object', value: { a: null } },
    { exception: 'Expected Array, got Object', value: { a: 0 } },
    { exception: 'Expected Array, got Object', value: { a: 0, b: 0 } },
    { exception: 'Expected Array, got Object', value: { b: 0 } },
    { exception: 'Expected Array, got Object', value: { a: { b: 0 } } },
    {
      exception: 'Expected Array, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected Array, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected Array, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected Array, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected Array, got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected Array, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    { exception: 'Expected Array, got Function', valueId: 'function' },
    {
      exception: 'Expected Array, got EmptyType',
      valueId: 'emptyType'
    },
    {
      exception: 'Expected Array, got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected Array, got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected Array, got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected Array, got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected Array, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected Array, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    { exception: 'Expected Array, got Object', valueId: '{ x: 1 }' },
    { exception: 'Expected Array, got Object', valueId: '{ y: 2 }' },
    {
      exception: 'Expected Array, got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    { exception: 'Expected Array, got Buffer', valueId: 'Buffer' },
    { exception: 'Expected Array, got Buffer', valueId: 'Buffer3' },
    { exception: 'Expected Array, got Buffer', valueId: 'Buffer10' },
    {
      exception: 'Expected Array, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected Array, got String "fff"', value: 'fff' },
    {
      exception: 'Expected Array, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected Array, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected Array, got Number -1', value: -1 },
    { exception: 'Expected Array, got Number 127', value: 127 },
    { exception: 'Expected Array, got Number 128', value: 128 },
    { exception: 'Expected Array, got Number 255', value: 255 },
    { exception: 'Expected Array, got Number 256', value: 256 },
    { exception: 'Expected Array, got Number -128', value: -128 },
    { exception: 'Expected Array, got Number -129', value: -129 },
    { exception: 'Expected Array, got Number 65534', value: 65534 },
    { exception: 'Expected Array, got Number 65535', value: 65535 },
    { exception: 'Expected Array, got Number 65536', value: 65536 },
    {
      exception: 'Expected Array, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected Array, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected Array, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected Array, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected Array, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
