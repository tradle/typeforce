
module.exports = {
  type: 'Object',
  valid: [
    { value: [] },
    { value: [ 0 ] },
    { value: [ 'foobar' ] },
    { value: [ { a: 0 } ] },
    { value: [ null ] },
    { value: null },
    { value: {} },
    { value: { a: null } },
    { value: { a: 0 } },
    { value: { a: 0, b: 0 } },
    { value: { b: 0 } },
    { value: { a: { b: 0 } } },
    { value: { a: { b: null } } },
    {
      value: { a: { b: { c: 0 } } }
    },
    {
      value: { a: { b: { c: null } } }
    },
    {
      value: { a: { b: { c: 0, d: 0 } } }
    },
    { value: { a: 'foo', b: 'bar' } },
    { value: { a: 'foo', b: { c: 'bar' } } },
    { valueId: 'emptyType' },
    { valueId: 'customType' },
    { valueId: '{ a: undefined }' },
    { valueId: '{ a: Buffer3 }' },
    { valueId: '{ a: Buffer10 }' },
    { valueId: '{ a: { b: Buffer3 } }' },
    { valueId: '{ a: { b: Buffer10 } }' },
    { valueId: '{ x: 1 }' },
    { valueId: '{ y: 2 }' },
    { valueId: '{ x: 1, y: 2 }' },
    { valueId: 'Array5' },
    { valueId: 'Array6' },
    { valueId: 'Array7-N' },
    { valueId: 'Array6-S' },
    { valueId: 'Array7' },
    { valueId: 'Buffer' },
    { valueId: 'Buffer3' },
    { valueId: 'Buffer10' }
  ],
  invalid: [
    { exception: 'Expected Object, got String ""', value: '' },
    {
      exception: 'Expected Object, got String "foobar"',
      value: 'foobar'
    },
    { exception: 'Expected Object, got Number 0', value: 0 },
    { exception: 'Expected Object, got Number 1', value: 1 },
    { exception: 'Expected Object, got Number 1\\.5', value: 1.5 },
    { exception: 'Expected Object, got Number 10', value: 10 },
    { exception: 'Expected Object, got Boolean false', value: false },
    { exception: 'Expected Object, got Boolean true', value: true },
    { exception: 'Expected Object, got undefined', value: undefined },
    { exception: 'Expected Object, got Function', valueId: 'function' },
    {
      exception: 'Expected Object, got String "boop"',
      valueId: 'String4'
    },
    { exception: 'Expected Object, got String "fff"', value: 'fff' },
    {
      exception: 'Expected Object, got String "cafe1122deadbeef"',
      value: 'cafe1122deadbeef'
    },
    {
      exception: 'Expected Object, got String "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20"',
      value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
    },
    { exception: 'Expected Object, got Number -1', value: -1 },
    { exception: 'Expected Object, got Number 127', value: 127 },
    { exception: 'Expected Object, got Number 128', value: 128 },
    { exception: 'Expected Object, got Number 255', value: 255 },
    { exception: 'Expected Object, got Number 256', value: 256 },
    { exception: 'Expected Object, got Number -128', value: -128 },
    { exception: 'Expected Object, got Number -129', value: -129 },
    { exception: 'Expected Object, got Number 65534', value: 65534 },
    { exception: 'Expected Object, got Number 65535', value: 65535 },
    { exception: 'Expected Object, got Number 65536', value: 65536 },
    {
      exception: 'Expected Object, got Number 4294967295',
      value: 4294967295
    },
    {
      exception: 'Expected Object, got Number 9007199254740991',
      value: 9007199254740991
    },
    {
      exception: 'Expected Object, got Number 9007199254740994',
      value: 9007199254740994
    },
    {
      exception: 'Expected Object, got Number -9007199254740991',
      value: -9007199254740991
    },
    {
      exception: 'Expected Object, got Number -9007199254740994',
      value: -9007199254740994
    }
  ]
}
