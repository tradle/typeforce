
module.exports = {
  type: '?Number',
  valid: [
    { value: 0 },
    { value: 1 },
    { value: 1.5 },
    { value: 10 },
    { value: undefined },
    { value: null },
    { value: -1 },
    { value: 127 },
    { value: 128 },
    { value: 255 },
    { value: 256 },
    { value: -128 },
    { value: -129 },
    { value: 65534 },
    { value: 65535 },
    { value: 65536 },
    { value: 4294967295 },
    { value: 9007199254740991 },
    { value: 9007199254740994 },
    { value: -9007199254740991 },
    { value: -9007199254740994 }
  ],
  invalid: [
    { exception: 'Expected \\?Number, got String ""', value: '' },
    {
      exception: 'Expected \\?Number, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected \\?Number, got Array', value: [] },
    { exception: 'Expected \\?Number, got Array', value: [ 0 ] },
    { exception: 'Expected \\?Number, got Array', value: [ 'foobar' ] },
    { exception: 'Expected \\?Number, got Array', value: [ { a: 0 } ] },
    { exception: 'Expected \\?Number, got Array', value: [ null ] },
    {
      exception: 'Expected \\?Number, got Boolean false',
      value: false
    },
    { exception: 'Expected \\?Number, got Boolean true', value: true },
    { exception: 'Expected \\?Number, got Object', value: {} },
    { exception: 'Expected \\?Number, got Object', value: { a: null } },
    { exception: 'Expected \\?Number, got Object', value: { a: 0 } },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: 0, b: 0 }
    },
    { exception: 'Expected \\?Number, got Object', value: { b: 0 } },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected \\?Number, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    {
      exception: 'Expected \\?Number, got Function',
      valueId: 'function'
    },
    {
      exception: 'Expected \\?Number, got EmptyType',
      valueId: 'emptyType'
    },
    {
      exception: 'Expected \\?Number, got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ x: 1 }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ y: 2 }'
    },
    {
      exception: 'Expected \\?Number, got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    { exception: 'Expected \\?Number, got Array', valueId: 'Array5' },
    { exception: 'Expected \\?Number, got Array', valueId: 'Array6' },
    { exception: 'Expected \\?Number, got Array', valueId: 'Array7-N' },
    { exception: 'Expected \\?Number, got Array', valueId: 'Array6-S' },
    { exception: 'Expected \\?Number, got Array', valueId: 'Array7' },
    { exception: 'Expected \\?Number, got Buffer', valueId: 'Buffer' },
    { exception: 'Expected \\?Number, got Buffer', valueId: 'Buffer3' },
    {
      exception: 'Expected \\?Number, got Buffer',
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected \\?Number, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected \\?Number, got String "fff"', value: 'fff' },
    {
      exception: 'Expected \\?Number, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected \\?Number, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    }
  ]
}
