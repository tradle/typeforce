const tape = require('tape')
const typeforce = require('../')
const typeforceAsync = require('../async')
const fixtures = require('./fixtures')
const TYPES = require('./types')
const VALUES = require('./values')

fixtures.valid.forEach(function (f) {
  const type = TYPES[f.typeId] || f.type
  const value = VALUES[f.valueId] || f.value
  const typeDescription = JSON.stringify(type)
  const valueDescription = JSON.stringify(value)
  const compiled = typeforce.compile(type)

  tape('passes ' + typeDescription + ' with ' + valueDescription, function (t) {
    t.plan(6)
    t.doesNotThrow(function () { typeforce.assert(type, value, f.strict) })
    typeforceAsync.assert(type, value, f.strict, t.ifErr)
    t.equal(typeforce.match(type, value, f.strict), true)

    t.doesNotThrow(function () { typeforce.assert(compiled, value, f.strict) })
    typeforceAsync.assert(compiled, value, f.strict, t.ifErr)
    t.equal(typeforce.match(compiled, value, f.strict), true)
  })
})

fixtures.invalid.forEach(function (f) {
  if (!f.exception) throw new TypeError('Expected exception')

  const type = TYPES[f.typeId] || f.type
  const value = VALUES[f.valueId] || f.value
  const typeDescription = f.typeId || JSON.stringify(type)
  const valueDescription = JSON.stringify(value)
  const compiled = typeforce.compile(type)

  tape('throws "' + f.exception + '" for type ' + typeDescription + ' with value of ' + valueDescription, function (t) {
    t.plan(10)

    t.throws(function () {
      typeforce.assert(type, value, f.strict)
    }, new RegExp(f.exception))
    typeforceAsync.assert(type, value, f.strict, (err) => {
      t.ok(err)
      t.throws(function () { throw err }, new RegExp(f.exception))
    })
    t.equal(typeforce.match(type, value, f.strict), false)
    t.throws(function () { throw typeforce.match.error }, new RegExp(f.exception))

    t.throws(function () {
      typeforce.assert(compiled, value, f.strict)
    }, new RegExp(f.exception))
    typeforceAsync.assert(compiled, value, f.strict, (err) => {
      t.ok(err)
      t.throws(function () { throw err }, new RegExp(f.exception))
    })
    t.equal(typeforce.match(compiled, value, f.strict), false)
    t.throws(function () { throw typeforce.match.error }, new RegExp(f.exception))
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
