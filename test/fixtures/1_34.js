
module.exports = {
  typeId: 'Buffer3',
  valid: [ { valueId: 'Buffer3' } ],
  invalid: [
    { exception: 'Expected Buffer, got String ""', value: '' },
    {
      exception: 'Expected Buffer, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected Buffer, got Number 0', value: 0 },
    { exception: 'Expected Buffer, got Number 1', value: 1 },
    { exception: 'Expected Buffer, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected Buffer, got Number 10', value: 10 },
    { exception: 'Expected Buffer, got Array', value: [] },
    { exception: 'Expected Buffer, got Array', value: [ 0 ] },
    { exception: 'Expected Buffer, got Array', value: [ 'foobar' ] },
    { exception: 'Expected Buffer, got Array', value: [ { a: 0 } ] },
    { exception: 'Expected Buffer, got Array', value: [ null ] },
    { exception: 'Expected Buffer, got Boolean false', value: false },
    { exception: 'Expected Buffer, got Boolean true', value: true },
    { exception: 'Expected Buffer, got undefined', value: undefined },
    { exception: 'Expected Buffer, got null', value: null },
    { exception: 'Expected Buffer, got Object', value: {} },
    { exception: 'Expected Buffer, got Object', value: { a: null } },
    { exception: 'Expected Buffer, got Object', value: { a: 0 } },
    { exception: 'Expected Buffer, got Object', value: { a: 0, b: 0 } },
    { exception: 'Expected Buffer, got Object', value: { b: 0 } },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: { b: 0 } }
    },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: { b: null } }
    },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: { b: { c: 0 } } }
    },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: { b: { c: null } } }
    },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: { b: { c: 0, d: 0 } } }
    },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: 'foo', b: 'bar' }
    },
    {
      exception: 'Expected Buffer, got Object',
      value: { a: 'foo', b: { c: 'bar' } }
    },
    { exception: 'Expected Buffer, got Function', valueId: 'function' },
    {
      exception: 'Expected Buffer, got EmptyType',
      valueId: 'emptyType'
    },
    {
      exception: 'Expected Buffer, got CustomType',
      valueId: 'customType'
    },
    {
      exception: 'Expected Buffer, got Object',
      valueId: '{ a: undefined }'
    },
    {
      exception: 'Expected Buffer, got Object',
      valueId: '{ a: Buffer3 }'
    },
    {
      exception: 'Expected Buffer, got Object',
      valueId: '{ a: Buffer10 }'
    },
    {
      exception: 'Expected Buffer, got Object',
      valueId: '{ a: { b: Buffer3 } }'
    },
    {
      exception: 'Expected Buffer, got Object',
      valueId: '{ a: { b: Buffer10 } }'
    },
    { exception: 'Expected Buffer, got Object', valueId: '{ x: 1 }' },
    { exception: 'Expected Buffer, got Object', valueId: '{ y: 2 }' },
    {
      exception: 'Expected Buffer, got Object',
      valueId: '{ x: 1, y: 2 }'
    },
    { exception: 'Expected Buffer, got Array', valueId: 'Array5' },
    { exception: 'Expected Buffer, got Array', valueId: 'Array6' },
    { exception: 'Expected Buffer, got Array', valueId: 'Array7-N' },
    { exception: 'Expected Buffer, got Array', valueId: 'Array6-S' },
    { exception: 'Expected Buffer, got Array', valueId: 'Array7' },
    {
      exception: 'Expected Buffer\\(Length\\: 3\\), got Buffer\\(Length\\: 0\\)',
      valueId: 'Buffer'
    },
    {
      exception: 'Expected Buffer\\(Length\\: 3\\), got Buffer\\(Length\\: 10\\)',
      valueId: 'Buffer10'
    },
    {
      exception: 'Expected Buffer, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected Buffer, got String "fff"', value: 'fff' },
    {
      exception: 'Expected Buffer, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected Buffer, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected Buffer, got Number -1', value: -1 },
    { exception: 'Expected Buffer, got Number 127', value: 127 },
    { exception: 'Expected Buffer, got Number 128', value: 128 },
    { exception: 'Expected Buffer, got Number 255', value: 255 },
    { exception: 'Expected Buffer, got Number 256', value: 256 },
    { exception: 'Expected Buffer, got Number -128', value: -128 },
    { exception: 'Expected Buffer, got Number -129', value: -129 },
    { exception: 'Expected Buffer, got Number 65534', value: 65534 },
    { exception: 'Expected Buffer, got Number 65535', value: 65535 },
    { exception: 'Expected Buffer, got Number 65536', value: 65536 },
    {
      exception: 'Expected Buffer, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected Buffer, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected Buffer, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected Buffer, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected Buffer, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
