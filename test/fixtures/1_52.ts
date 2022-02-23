import fixture from './fixture'

const fix = fixture('1_52 - "Range(assert)1-5"', (types: { [key: string]: any }) => types['Range(assert)1-5'], ({ invalid }) => {
  invalid({ exception: 'not a number', value: '' })
  invalid({ exception: 'not a number', value: 'foobar' })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 0', value: 0 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 1', value: 1 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 1\\.5', value: 1.5 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 10', value: 10 })
  invalid({ exception: 'not a number', value: [] })
  invalid({ exception: 'not a number', value: [ 0 ] })
  invalid({ exception: 'not a number', value: [ 'foobar' ] })
  invalid({ exception: 'not a number', value: [ { a: 0 } ] })
  invalid({ exception: 'not a number', value: [ null ] })
  invalid({ exception: 'not a number', value: false })
  invalid({ exception: 'not a number', value: true })
  invalid({ exception: 'not a number', value: undefined })
  invalid({ exception: 'not a number', value: null })
  invalid({ exception: 'not a number', value: {} })
  invalid({ exception: 'not a number', value: { a: null } })
  invalid({ exception: 'not a number', value: { a: 0 } })
  invalid({ exception: 'not a number', value: { a: 0, b: 0 } })
  invalid({ exception: 'not a number', value: { b: 0 } })
  invalid({ exception: 'not a number', value: { a: { b: 0 } } })
  invalid({ exception: 'not a number', value: { a: { b: null } } })
  invalid({
    exception: 'not a number',
    value: { a: { b: { c: 0 } } }
  })
  invalid({
    exception: 'not a number',
    value: { a: { b: { c: null } } }
  })
  invalid({
    exception: 'not a number',
    value: { a: { b: { c: 0, d: 0 } } }
  })
  invalid({ exception: 'not a number', value: { a: 'foo', b: 'bar' } })
  invalid({ exception: 'not a number', value: { a: 'foo', b: { c: 'bar' } } })
  invalid({ exception: 'not a number', valueId: 'function' })
  invalid({ exception: 'not a number', valueId: 'emptyType' })
  invalid({ exception: 'not a number', valueId: 'customType' })
  invalid({ exception: 'not a number', valueId: '{ a: undefined }' })
  invalid({ exception: 'not a number', valueId: '{ a: Buffer3 }' })
  invalid({ exception: 'not a number', valueId: '{ a: Buffer10 }' })
  invalid({ exception: 'not a number', valueId: '{ a: { b: Buffer3 } }' })
  invalid({ exception: 'not a number', valueId: '{ a: { b: Buffer10 } }' })
  invalid({ exception: 'not a number', valueId: '{ x: 1 }' })
  invalid({ exception: 'not a number', valueId: '{ y: 2 }' })
  invalid({ exception: 'not a number', valueId: '{ x: 1, y: 2 }' })
  invalid({ exception: 'not a number', valueId: 'Array5' })
  invalid({ exception: 'not a number', valueId: 'Array6' })
  invalid({ exception: 'not a number', valueId: 'Array7-N' })
  invalid({ exception: 'not a number', valueId: 'Array6-S' })
  invalid({ exception: 'not a number', valueId: 'Array7' })
  invalid({ exception: 'not a number', valueId: 'Buffer' })
  invalid({ exception: 'not a number', valueId: 'Buffer3' })
  invalid({ exception: 'not a number', valueId: 'Buffer10' })
  invalid({ exception: 'not a number', valueId: 'String4' })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 1', valueId: 'Finite' })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number Infinity',
    valueId: '+Infinity'
  })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number -Infinity',
    valueId: '-Infinity'
  })
  invalid({ exception: 'not a number', value: 'fff' })
  invalid({ exception: 'not a number', value: 'cafe1122deadbeef' })
  invalid({
    exception: 'not a number',
    value: '0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20'
  })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number -1', value: -1 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 127', value: 127 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 128', value: 128 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 255', value: 255 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 256', value: 256 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number -128', value: -128 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number -129', value: -129 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 65534', value: 65534 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 65535', value: 65535 })
  invalid({ exception: 'Expected Number between \\[1, 5\\], got Number 65536', value: 65536 })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number 4294967295',
    value: 4294967295
  })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number 9007199254740991',
    value: 9007199254740991
  })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number 9007199254740994',
    value: 9007199254740994
  })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number -9007199254740991',
    value: -9007199254740991
  })
  invalid({
    exception: 'Expected Number between \\[1, 5\\], got Number -9007199254740994',
    value: -9007199254740994
  })
})

export default fix
