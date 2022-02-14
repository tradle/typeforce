function getTypeName (fn) {
  return fn.name || fn.toString().match(/function (.*?)\s*\(/)[1]
}

function getValueTypeName (value) {
  return value === null || value === undefined ? '' : getTypeName(value.constructor)
}

function getValue (value) {
  if (typeof value === 'function') return ''
  if (typeof value === 'string') return JSON.stringify(value)
  if (value !== null && typeof value === 'object') return ''
  return value
}

function captureStackTrace (e, t) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(e, t)
  }
}

function tfJSON (type) {
  if (typeof type === 'function') return type.toJSON ? type.toJSON() : getTypeName(type)
  if (Array.isArray(type)) return 'Array'
  if (type !== null && typeof type === 'object') return 'Object'

  return type !== undefined ? type : ''
}

function tfErrorString (type, value, valueTypeName) {
  const valueJson = getValue(value)

  return 'Expected ' + tfJSON(type) + ', got' +
    (valueTypeName !== '' ? ' ' + valueTypeName : '') +
    (valueJson !== '' ? ' ' + valueJson : '')
}

function TfTypeError (type, value, valueTypeName) {
  valueTypeName = valueTypeName || getValueTypeName(value)
  this.message = tfErrorString(type, value, valueTypeName)

  captureStackTrace(this, TfTypeError)
  this.__type = type
  this.__value = value
  this.__valueTypeName = valueTypeName
}

TfTypeError.prototype = Object.create(Error.prototype)
TfTypeError.prototype.constructor = TfTypeError

function tfPropertyErrorString (type, label, name, value, valueTypeName) {
  let description = '" of type '
  if (label === 'key') description = '" with key type '

  return tfErrorString('property "' + tfJSON(name) + description + tfJSON(type), value, valueTypeName)
}

function TfPropertyTypeError (type, property, label, value, valueTypeName) {
  if (type) {
    valueTypeName = valueTypeName || getValueTypeName(value)
    this.message = tfPropertyErrorString(type, label, property, value, valueTypeName)
  } else {
    this.message = 'Unexpected property "' + property + '"'
  }

  captureStackTrace(this, TfTypeError)
  this.__label = label
  this.__property = property
  this.__type = type
  this.__value = value
  this.__valueTypeName = valueTypeName
}

TfPropertyTypeError.prototype = Object.create(Error.prototype)
TfPropertyTypeError.prototype.constructor = TfTypeError

function tfCustomError (expected, actual) {
  return new TfTypeError(expected, {}, actual)
}

function tfSubError (e, property, label) {
  // sub child?
  if (e instanceof TfPropertyTypeError) {
    property = property + '.' + e.__property

    e = new TfPropertyTypeError(
      e.__type, property, e.__label, e.__value, e.__valueTypeName
    )

  // child?
  } else if (e instanceof TfTypeError) {
    e = new TfPropertyTypeError(
      e.__type, property, label, e.__value, e.__valueTypeName
    )
  }

  captureStackTrace(e)
  return e
}

function addAPI (fn, json) {
  if (json === undefined) {
    json = fn.name
  }
  const assert = function (value, strict) {
    if (fn(value, strict)) return true

    throw new TfTypeError(fn, value)
  }
  const match = function (value, strict) {
    try {
      return assert(value, strict)
    } catch (e) {
      match.error = e
      return false
    }
  }
  return Object.assign(fn, {
    toJSON: function () { return json },
    assert: assert,
    match: match
  })
}

module.exports = {
  addAPI: addAPI,
  TfTypeError: TfTypeError,
  TfPropertyTypeError: TfPropertyTypeError,
  tfCustomError: tfCustomError,
  tfSubError: tfSubError,
  tfJSON: tfJSON,
  getValueTypeName: getValueTypeName
}
