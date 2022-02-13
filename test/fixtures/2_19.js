
module.exports = {
  type: null,
  valid: [ { value: null } ],
  invalid: [
    { exception: 'Expected null, got String ""', value: '' },
    {
      exception: 'Expected null, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected null, got Number 0', value: 0 },
    { exception: 'Expected null, got Number 1', value: 1 },
    { exception: 'Expected null, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected null, got Number 10', value: 10 },
    { exception: 'Expected null, got Array', value: [] },
    { exception: 'Expected null, got Array', value: [ 0 ] },
    { exception: 'Expected null, got Array', value: [ 'foobar' ] },
    { exception: 'Expected null, got Array', value: [ { a: 0 } ] },
    { exception: 'Expected null, got Array', value: [ null ] },
    { exception: 'Expected null, got Boolean false', value: false },
    { exception: 'Expected null, got Boolean true', value: true },
    { exception: 'Expected null, got undefined', value: undefined },
    { exception: 'Expected null, got Object', value: {} },
    { exception: 'Expected null, got Object', value: { a: null } },
    { exception: 'Expected null, got Object', value: { a: 0 } },
    { exception: 'Expected null, got Object', value: { a: 0, b: 0 } },
    { exception: 'Expected null, got Object', value: { b: 0 } },
    { exception: 'Expected null, got Object', value: { a: { b: 0 } } },
    {
      exception: 'Expected null, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected null, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected null, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected null, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected null, got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected null, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    { exception: 'Expected null, got Function', valueId: 'function' },
    { exception: 'Expected null, got EmptyType', valueId: 'emptyType' },
    {
      exception: 'Expected null, got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected null, got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected null, got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected null, got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected null, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected null, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    { exception: 'Expected null, got Object', valueId: '{ x: 1 }' },
    { exception: 'Expected null, got Object', valueId: '{ y: 2 }' },
    {
      exception: 'Expected null, got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    { exception: 'Expected null, got Array', valueId: 'Array5' },
    { exception: 'Expected null, got Array', valueId: 'Array6' },
    { exception: 'Expected null, got Array', valueId: 'Array7-N' },
    { exception: 'Expected null, got Array', valueId: 'Array6-S' },
    { exception: 'Expected null, got Array', valueId: 'Array7' },
    { exception: 'Expected null, got Buffer', valueId: 'Buffer' },
    { exception: 'Expected null, got Buffer', valueId: 'Buffer3' },
    { exception: 'Expected null, got Buffer', valueId: 'Buffer10' },
    {
      exception: 'Expected null, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected null, got String "fff"', value: 'fff' },
    {
      exception: 'Expected null, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected null, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected null, got Number -1', value: -1 },
    { exception: 'Expected null, got Number 127', value: 127 },
    { exception: 'Expected null, got Number 128', value: 128 },
    { exception: 'Expected null, got Number 255', value: 255 },
    { exception: 'Expected null, got Number 256', value: 256 },
    { exception: 'Expected null, got Number -128', value: -128 },
    { exception: 'Expected null, got Number -129', value: -129 },
    { exception: 'Expected null, got Number 65534', value: 65534 },
    { exception: 'Expected null, got Number 65535', value: 65535 },
    { exception: 'Expected null, got Number 65536', value: 65536 },
    {
      exception: 'Expected null, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected null, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected null, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected null, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected null, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
