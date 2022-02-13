const typeforce = require('./')

function tfNoThrow (type, value, strict) {
  try {
    return typeforce.assert(type, value, strict)
  } catch (e) {
    tfNoThrow.error = e
    return false
  }
}

module.exports = Object.assign(tfNoThrow, typeforce)
