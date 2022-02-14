const ERRORS = require('./errors')
const NATIVE = require('./native')
const addAPI = ERRORS.addAPI

// short-hand
const TfTypeError = ERRORS.TfTypeError
const TfPropertyTypeError = ERRORS.TfPropertyTypeError
const tfSubError = ERRORS.tfSubError
const getValueTypeName = ERRORS.getValueTypeName

const toJSON = val => val.toJSON()

const TYPES = {
  arrayOf: function arrayOf (type, options) {
    type = compile(type)
    options = options || {}
    let str = '[' + type.toJSON() + ']'
    if (options.length !== undefined) {
      str += '{' + options.length + '}'
    } else if (options.minLength !== undefined || options.maxLength !== undefined) {
      str += '{' +
        (options.minLength === undefined ? 0 : options.minLength) + ',' +
        (options.maxLength === undefined ? Infinity : options.maxLength) + '}'
    }

    return addAPI(function _arrayOf (array, strict) {
      if (!NATIVE.Array(array)) return false
      if (options.minLength !== undefined && array.length < options.minLength) return false
      if (options.maxLength !== undefined && array.length > options.maxLength) return false
      if (options.length !== undefined && array.length !== options.length) return false

      return array.every(function (value, i) {
        try {
          return typeforce.assert(type, value, strict)
        } catch (e) {
          throw tfSubError(e, i)
        }
      })
    }, str)
  },

  maybe: function maybe (type) {
    type = compile(type)

    return addAPI(function _maybe (value, strict) {
      return NATIVE.Nil(value) || type(value, strict, maybe)
    }, '?' + type.toJSON())
  },

  map: function map (propertyType, propertyKeyType) {
    propertyType = compile(propertyType)
    if (propertyKeyType) propertyKeyType = compile(propertyKeyType)

    return addAPI(function _map (value, strict) {
      if (!NATIVE.Object(value)) return false
      if (NATIVE.Nil(value)) return false

      for (const propertyName in value) {
        try {
          if (propertyKeyType) {
            assert(propertyKeyType, propertyName, strict)
          }
        } catch (e) {
          throw tfSubError(e, propertyName, 'key')
        }

        try {
          const propertyValue = value[propertyName]
          assert(propertyType, propertyValue, strict)
        } catch (e) {
          throw tfSubError(e, propertyName)
        }
      }

      return true
    }, propertyKeyType ?
      '{' + propertyKeyType.toJSON() + ': ' + propertyType.toJSON() + '}' :
      '{' + propertyType.toJSON() + '}')
  },

  object: function object (uncompiled) {
    const type = {}

    for (const typePropertyName in uncompiled) {
      type[typePropertyName] = compile(uncompiled[typePropertyName])
    }

    return addAPI(function _object (value, strict) {
      if (!NATIVE.Object(value)) return false
      if (NATIVE.Nil(value)) return false

      let propertyName

      try {
        for (propertyName in type) {
          const propertyType = type[propertyName]
          const propertyValue = value[propertyName]

          assert(propertyType, propertyValue, strict)
        }
      } catch (e) {
        throw tfSubError(e, propertyName)
      }

      if (strict) {
        for (propertyName in value) {
          if (type[propertyName]) continue

          throw new TfPropertyTypeError(undefined, propertyName)
        }
      }

      return true
    }, 'Object')
  },

  anyOf: function anyOf () {
    const types = [].slice.call(arguments).map(compile)

    return addAPI(function _anyOf (value, strict) {
      return types.some(function (type) {
        try {
          return assert(type, value, strict)
        } catch (e) {
          return false
        }
      })
    }, types.map(toJSON).join('|'))
  },

  allOf: function allOf () {
    const types = [].slice.call(arguments).map(compile)

    return addAPI(function _allOf (value, strict) {
      return types.every(function (type) {
        try {
          return assert(type, value, strict)
        } catch (e) {
          return false
        }
      })
    }, types.map(toJSON).join(' & '))
  },

  quacksLike: function quacksLike (type) {
    return addAPI(function _quacksLike (value) {
      return type === getValueTypeName(value)
    }, type)
  },

  tuple: function tuple () {
    const types = [].slice.call(arguments).map(compile)

    return addAPI(function _tuple (values, strict) {
      if (NATIVE.Nil(values)) return false
      if (NATIVE.Nil(values.length)) return false
      if (strict && (values.length !== types.length)) return false

      return types.every(function (type, i) {
        try {
          return assert(type, values[i], strict)
        } catch (e) {
          throw tfSubError(e, i)
        }
      })
    }, '(' + types.map(toJSON).join(', ') + ')')
  },

  value: function value (expected) {
    return addAPI(function _value (actual) {
      return actual === expected
    }, expected)
  }
}

// TODO: deprecate
TYPES.oneOf = TYPES.anyOf

function compile (type) {
  if (NATIVE.Validator(type)) {
    return type
  }
  if (NATIVE.String(type)) {
    if (type[0] === '?') return TYPES.maybe(type.slice(1))

    return NATIVE[type] || TYPES.quacksLike(type)
  }
  if (type && NATIVE.Object(type)) {
    if (NATIVE.Array(type)) {
      if (type.length !== 1) throw new TypeError('Expected compile() parameter of type Array of length 1')
      return TYPES.arrayOf(type[0])
    }

    return TYPES.object(type)
  }
  if (NATIVE.Function(type)) {
    return addAPI(type)
  }

  return TYPES.value(type)
}

function assert (type, value, strict) {
  return compile(type).assert(value, strict)
}

function match (type, value, strict) {
  try {
    return compile(type).assert(value, strict)
  } catch (err) {
    match.error = err
    return false
  }
}
const typeforce = {}
typeforce.assert = assert
typeforce.match = match
// assign types to typeforce function
for (const typeName in NATIVE) {
  typeforce[typeName] = NATIVE[typeName]
}

for (const typeName in TYPES) {
  typeforce[typeName] = TYPES[typeName]
}

const EXTRA = require('./extra')
for (const typeName in EXTRA) {
  typeforce[typeName] = EXTRA[typeName]
}
typeforce.compile = compile
typeforce.TfTypeError = TfTypeError
typeforce.TfPropertyTypeError = TfPropertyTypeError

module.exports = typeforce
