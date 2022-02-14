const addAPI = require('./errors').addAPI
const types = {
  Validator: function (value) { return typeof value === 'function' && 'assert' in value && 'match' in value && 'toJSON' in value },
  Array: function (value) { return value !== null && value !== undefined && value.constructor === Array },
  Boolean: function (value) { return typeof value === 'boolean' },
  Function: function (value) { return typeof value === 'function' },
  Nil: function (value) { return value === undefined || value === null },
  Number: function (value) { return typeof value === 'number' },
  Object: function (value) { return typeof value === 'object' },
  String: function (value) { return typeof value === 'string' }
}

// TODO: deprecate
types.Null = types.Nil

for (const typeName in types) {
  addAPI(types[typeName])
}

module.exports = types
