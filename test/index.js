const tape = require('tape')
const typeforce = require('../')
const typeforceAsync = require('../async')
const fixtures = require('./fixtures')
const TYPES = require('./types')
const VALUES = require('./values')

fixtures.forEach(function (fixture) {
  const type = TYPES[fixture.typeId] || fixture.type
  const typeDescription = JSON.stringify(type)

  fixture.valid.forEach(valid => {
    const value = VALUES[valid.valueId] || valid.value
    const valueDescription = JSON.stringify(value)
    const compiled = typeforce.compile(type)
  
    tape('passes ' + typeDescription + ' with ' + valueDescription, function (t) {
      t.plan(6)
      t.doesNotThrow(function () { typeforce.assert(type, value, valid.strict) })
      typeforceAsync.assert(type, value, valid.strict, t.ifErr)
      t.equal(typeforce.match(type, value, valid.strict), true)
  
      t.doesNotThrow(function () { typeforce.assert(compiled, value, valid.strict) })
      typeforceAsync.assert(compiled, value, valid.strict, t.ifErr)
      t.equal(typeforce.match(compiled, value, valid.strict), true)
    })
  })
  fixture.invalid.forEach(invalid => {
    if (!invalid.exception) throw new TypeError('Expected exception')
    const value = VALUES[invalid.valueId] || invalid.value
    const valueDescription = JSON.stringify(value)
    const compiled = typeforce.compile(type)

    tape('throws "' + invalid.exception + '" for type ' + typeDescription + ' with value of ' + valueDescription, function (t) {
      t.plan(10)

      t.throws(function () {
        typeforce.assert(type, value, invalid.strict)
      }, new RegExp(invalid.exception))
      typeforceAsync.assert(type, value, invalid.strict, (err) => {
        t.ok(err)
        t.throws(function () { throw err }, new RegExp(invalid.exception))
      })
      t.equal(typeforce.match(type, value, invalid.strict), false)
      t.throws(function () { throw typeforce.match.error }, new RegExp(invalid.exception))

      t.throws(function () {
        typeforce.assert(compiled, value, invalid.strict)
      }, new RegExp(invalid.exception))
      typeforceAsync.assert(compiled, value, invalid.strict, (err) => {
        t.ok(err)
        t.throws(function () { throw err }, new RegExp(invalid.exception))
      })
      t.equal(typeforce.match(compiled, value, invalid.strict), false)
      t.throws(function () { throw typeforce.match.error }, new RegExp(invalid.exception))
    })
  })
})

const err = new typeforce.TfTypeError('mytype')
function failType () { throw err }

tape('TfTypeError is an Error', function (t) {
  t.plan(3)
  t.ok(err instanceof Error)
  t.equal(err.message, 'Expected mytype, got undefined')

  t.throws(function () {
    typeforce.assert(failType, 0xdeadbeef)
  }, /Expected mytype, got undefined/)
})

tape('TfTypeError is caught by typeforce.anyOf', function (t) {
  t.plan(2)

  t.doesNotThrow(function () {
    typeforce.anyOf(failType)('value')
  })

  t.ok(!typeforce.anyOf(failType, typeforce.string)('value'))
})

tape('Error is thrown for bad compile parameters', function (t) {
  t.plan(2)

  t.throws(function () {
    typeforce.compile([])
  }, /Expected compile\(\) parameter of type Array of length 1/)

  t.throws(function () {
    typeforce.compile([typeforce.Number, typeforce.String])
  }, /Expected compile\(\) parameter of type Array of length 1/)
})
