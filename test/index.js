const tape = require('tape')
const typeforce = require('../')
const typeforceAsync = require('../async')
const fixtures = require('./fixtures')
const TYPES = require('./types')
const VALUES = require('./values')

function tests (t, compiled) {
  return {
    valid (valid) {
      const value = VALUES[valid.valueId] || valid.value
      t.equal(typeforce.match(compiled, value, valid.strict), true, 'passes with ' + JSON.stringify(value))
    },
    invalid (invalid) {
      if (!invalid.exception) throw new TypeError('Expected exception')
      const value = VALUES[invalid.valueId] || invalid.value
      t.throws(function () {
        typeforce.assert(compiled, value, invalid.strict)
      }, new RegExp(invalid.exception), 'throws "' + invalid.exception + '" with value of ' + JSON.stringify(value))
    }
  }
}

fixtures.forEach(function (fixture) {
  const type = TYPES[fixture.typeId] || fixture.type
  tape(`type: ${JSON.stringify(type)}`, t => {
    const { valid, invalid } = tests(t, typeforce.compile(type))
    fixture.valid.forEach(valid)
    fixture.invalid.forEach(invalid)
    t.end()
  })
})

const err = new typeforce.TfTypeError('mytype')
function failType () { throw err }

tape('match handler', function (t) {
  t.equals(typeforce.match(() => false, true), false, 'non match should result in false')
  t.equals(typeforce.match(() => true, 1), true, 'match is checked as well')
  const testError = new Error('test error ')
  t.equals(typeforce.match(() => { throw testError }), false, 'error doesnt throw')
  t.equals(typeforce.match.error, testError, 'error is kept in global')
  typeforce.match.error = null
  t.equals(typeforce.match.error, null, 'error can be cleared')
  t.end()
})

tape('async', function (t) {
  t.test('pass', function (t) {
    typeforceAsync.assert(
      (value, strict) => {
        t.equals(strict, false, 'default strict is undefined in async')
        return typeof value === 'string'
      },
      '1',
      (err, pass) => {
        t.error(err)
        t.ok(pass)
        t.end()
      }
    )
  })
  t.test('pass (strict: true)', function (t) {
    typeforceAsync.assert(
      (value, strict) => {
        t.equals(strict, true, 'other strict value is passed through')
        return typeof value === 'string'
      },
      '1',
      true,
      (err, pass) => {
        t.error(err)
        t.ok(pass)
        t.end()
      }
    )
  })
  t.test('pass (strict: null)', function (t) {
    typeforceAsync.assert(
      (value, strict) => {
        t.equals(strict, null, 'other strict value is passed through')
        return typeof value === 'string'
      },
      '1',
      null,
      (err, pass) => {
        t.error(err)
        t.ok(pass)
        t.end()
      }
    )
  })
  t.test('fail (strict: null)', function (t) {
    typeforceAsync.assert(
      Object.assign(
        (value, strict) => {
          t.equals(strict, null, 'other strict value is passed through')
          return typeof value === 'string'
        }, {
          toJSON: function () {
            return 'custom check'
          }
        }
      ),
      1,
      null,
      (err, pass) => {
        t.match(err.message, /Expected custom check, got Number 1/)
        t.equals(pass, undefined)
        t.end()
      }
    )
  })
})

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
