import type {
  Validator, Maybe, ArrayOfOptions,
  FlattenAnd, FlattenOr, Mapped, ObjInput,
  ObjectTypes, Tuple
} from './interfaces'
import * as errors from './errors'
import * as native from './native'

const { addAPI, TfPropertyTypeError, tfSubError, assertType, tfString } = errors
const { Array: isArray } = native

export function maybe <T> (type: Validator<T>): Validator<Maybe<T>> {
  return addAPI(
    function _maybe (value: any, strict?: boolean): value is Maybe<T> {
      return value === null || value === undefined || type(value, strict)
    },
    `?${tfString(type)}`
  )
}

function arrayName (type: Validator<any>, { length, minLength, maxLength }: ArrayOfOptions): string {
  const name: string = `[${tfString(type)}]`
  if (length !== undefined) {
    return `${name}{${length}}`
  }
  if (minLength !== undefined || maxLength !== undefined) {
    return `${name}{${minLength ?? 0},${maxLength ?? Infinity}}`
  }
  return name
}

export function arrayOf <T> (type: Validator<T>, options?: ArrayOfOptions): Validator<T[]> {
  options ??= {}
  const { length, minLength, maxLength } = options

  function match (array: any[], strict?: boolean): boolean {
    return array.every((value, i) => {
      try {
        return assertType(type, value, strict)
      } catch (e) {
        throw tfSubError(e as Error, i.toString())
      }
    })
  }

  return addAPI(
    length !== undefined
      ? function _ArrayLength (value: any, strict?: boolean): value is T[] { return isArray(value) && value.length === length && match(value, strict) }
      : minLength !== undefined
        ? maxLength !== undefined
          ? function _ArrayMinMax (value: any, strict?: boolean): value is T[] { return isArray(value) && value.length >= minLength && value.length <= maxLength && match(value, strict) }
          : function _ArrayMin (value: any, strict?: boolean): value is T[] { return isArray(value) && value.length >= minLength && match(value, strict) }
        : maxLength !== undefined
          ? function _ArrayMax (value: any, strict?: boolean): value is T[] { return isArray(value) && value.length <= maxLength && match(value, strict) }
          : function _Array (value: any, strict?: boolean): value is T[] { return isArray(value) && match(value, strict) },
    arrayName(type, options)
  )
}

export function mapKeyed <Value> (valueType: Validator<Value>, keyType: Validator<string | number>): Validator<Mapped<Value>> {
  return addAPI(function _mapKeyed (input: any, strict?: boolean): input is Mapped<Value> {
    if (input === null || typeof input !== 'object') return false
    for (const key in input) {
      try {
        assertType(keyType, key, strict)
      } catch (error) {
        throw tfSubError(error as Error, key, 'key')
      }
      const value = input[key]
      try {
        assertType(valueType, value, strict)
      } catch (error) {
        throw tfSubError(error as Error, key)
      }
    }
    return true
  }, `{${tfString(keyType)}: ${tfString(valueType)}}`)
}

export function mapSimple <Value> (valueType: Validator<Value>): Validator<Mapped<Value>> {
  return addAPI(function _mapSimple (input: any, strict?: boolean): input is Mapped<Value> {
    if (input === null || typeof input !== 'object') return false
    for (const key in input) {
      const value = input[key]
      try {
        assertType(valueType, value, strict)
      } catch (error) {
        throw tfSubError(error as Error, key)
      }
    }
    return true
  }, `{${tfString(valueType)}}`)
}

export function map <Value> (propType: Validator<Value>, keyType?: Validator<string | number>): Validator<Mapped<Value>> {
  if (keyType != null) return mapKeyed(propType, keyType)
  return mapSimple(propType)
}

export function object <Type extends ObjInput> (type: Type): Validator<ObjectTypes<Type>> {
  return addAPI(function _object (value: any, strict?: boolean): value is ObjectTypes<Type> {
    if (value === null || typeof value !== 'object') return false

    for (const propertyName in type) {
      try {
        assertType(type[propertyName], value[propertyName], strict)
      } catch (e) {
        throw tfSubError(e as Error, propertyName)
      }
    }

    if (strict === true) {
      for (const propertyName in value) {
        if (propertyName in type) continue
        throw new TfPropertyTypeError(undefined, propertyName)
      }
    }
    return true
  }, 'Object')
}

export function anyOf <T extends Array<Validator<any>>> (...types: T): Validator<FlattenOr<T>> {
  return addAPI(function _anyOf (value: any, strict?: boolean): value is FlattenOr<T> {
    let i = types.length
    while (i !== 0) {
      try {
        return assertType(types[--i], value, strict)
      } catch (e) {}
    }
    return false
  }, types.map(tfString).join('|'))
}

export function allOf <T extends Array<Validator<any>>> (...types: T): Validator<FlattenAnd<T>> {
  return addAPI(function _allOf (value: any, strict?: boolean): value is FlattenAnd<T> {
    let i = types.length
    while (i !== 0) {
      try {
        assertType(types[--i], value, strict)
      } catch (e) {
        return false
      }
    }
    return true
  }, types.map(tfString).join('|'))
}

export function tuple <T extends Array<Validator<any>>> (...types: T): Validator<Tuple<T>> {
  return addAPI(function _tuple (values: any, strict?: boolean): values is Tuple<T> {
    if (values === null || values === undefined) return false
    if (values.length === null || values.length === undefined) return false
    const l = types.length
    if (strict === true && (l !== values.length)) return false

    let i = 0
    while (i !== l) {
      try {
        assertType(types[i], values[i], strict)
      } catch (e) {
        throw tfSubError(e as Error, i.toString())
      }
      i += 1
    }
    return true
  }, `(${types.map(tfString).join(', ')})`)
}
