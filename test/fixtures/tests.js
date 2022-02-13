const VALUES = require('../values')
const typeforce = require('../../')

module.exports = function tests (t, type) {
  const compiled = typeforce.compile(type)
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