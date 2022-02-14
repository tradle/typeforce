const tape = require('fresh-tape')
const typeforce = require('../')
const typeforceAsync = require('../async')

// Load fixtures test!
require('./fixtures')

const err = new typeforce.TfTypeError('mytype')
function failType () { throw err }

tape('match variants', function (t) {
  t.test('typeforce.match', function (t) {
    t.equals(typeforce.match(() => false, true), false, 'non match should result in false')
    t.equals(typeforce.match(() => true, 1), true, 'match is checked as well')
    t.equals(typeforce.match('String', 1), false, 'error is caught')
    t.match(typeforce.match.error.message, /Expected String, got Number 1/, 'error is kept in global')
    t.match(typeforce.matchRaw.error.message, /Expected String, got Number 1/, 'matchRaw/match error are linked')
    typeforce.match.error = null
    t.equals(typeforce.match.error, null, 'error can be cleared')
    t.equals(typeforce.matchRaw.error, null, 'matchRaw/match are linked')
    t.end()
  })
  t.test('typeforce.matchRaw', function (t) {
    t.equals(typeforce.matchRaw(() => false, true), false, 'non match should result in false')
    t.equals(typeforce.matchRaw(() => true, 1), true, 'match is checked as well')
    const testError = new Error('test error ')
    t.equals(typeforce.matchRaw(() => { throw testError }), false, 'error is caught')
    t.equals(typeforce.matchRaw.error, testError, 'error is kept in global')
    t.equals(typeforce.match.error, testError, 'matchRaw/match error are linked')
    typeforce.matchRaw.error = null
    t.equals(typeforce.matchRaw.error, null, 'error can be cleared')
    t.equals(typeforce.match.error, null, 'matchRaw/match are linked')
    t.end()
  })
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
