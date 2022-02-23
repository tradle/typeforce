import type {
  Check, Maybe, ArrayOfOptions,
  FlattenAnd, FlattenOr, Mapped, ObjInput,
  ObjectTypes, Tuple, Raw, TypeForCheck, AssertCheck, DerivedCheck, MatchCheck, AssertType
} from './interfaces'
import * as errors from './errors'
import * as native from './native'
import { assertAnyType } from '.'

const { addAPI, TfPropertyTypeError, tfSubError, assertType, tfString } = errors
const { Array: isArray } = native

export function maybe <T extends Raw> (type: T): DerivedCheck<T, Maybe<TypeForCheck<T>>> {
  return addAPI(
    function _maybe (value: any, strict?: boolean): boolean {
      return value === null || value === undefined || type(value, strict) || false
    } as Raw,
    `?${tfString(type)}`
  ) as DerivedCheck<T, Maybe<TypeForCheck<T>>>
}

function arrayName <T extends Raw> (type: T, { length, minLength, maxLength }: ArrayOfOptions): string {
  const name: string = `[${tfString(type)}]`
  if (length !== undefined) {
    return `${name}{${length}}`
  }
  if (minLength !== undefined || maxLength !== undefined) {
    return `${name}{${minLength ?? 0},${maxLength ?? Infinity}}`
  }
  return name
}

export function arrayOf <T extends Raw> (type: T, options?: ArrayOfOptions): AssertCheck<Array<TypeForCheck<T>>> {
  options ??= {}
  const { length, minLength, maxLength } = options

  function match (array: any[], strict?: boolean): boolean {
    array.forEach((value: any, i) => {
      try {
        const t: Raw = type
        const a: AssertType<string> = assertType
        a(t, value, strict)
      } catch (e) {
        throw tfSubError(e as Error, i.toString())
      }
    })
    return true
  }

  return addAPI(
    length !== undefined
      ? function _ArrayLength (value: any, strict?: boolean): value is Array<TypeForCheck<T>> { return isArray(value) && value.length === length && match(value, strict) }
      : minLength !== undefined
        ? maxLength !== undefined
          ? function _ArrayMinMax (value: any, strict?: boolean): value is Array<TypeForCheck<T>> { return isArray(value) && value.length >= minLength && value.length <= maxLength && match(value, strict) }
          : function _ArrayMin (value: any, strict?: boolean): value is Array<TypeForCheck<T>> { return isArray(value) && value.length >= minLength && match(value, strict) }
        : maxLength !== undefined
          ? function _ArrayMax (value: any, strict?: boolean): value is Array<TypeForCheck<T>> { return isArray(value) && value.length <= maxLength && match(value, strict) }
          : function _Array (value: any, strict?: boolean): value is Array<TypeForCheck<T>> { return isArray(value) && match(value, strict) },
    arrayName(type, options)
  )
}

export function mapKeyed <Value extends Raw> (valueType: Value, keyType: Raw): AssertCheck<Mapped<TypeForCheck<Value>>> {
  return addAPI(function _mapKeyed (input: any, strict?: boolean): input is Mapped<TypeForCheck<Value>> {
    if (input === null || typeof input !== 'object') return false
    for (const key in input) {
      try {
        assertAnyType(keyType, key, strict)
      } catch (error) {
        throw tfSubError(error as Error, key, 'key')
      }
      const value = input[key]
      try {
        assertAnyType(valueType, value, strict)
      } catch (error) {
        throw tfSubError(error as Error, key)
      }
    }
    return true
  }, `{${tfString(keyType)}: ${tfString(valueType)}}`)
}

export function mapSimple <Value extends Raw> (valueType: Value): Check<Mapped<TypeForCheck<Value>>> {
  return addAPI(function _mapSimple (input: any, strict?: boolean): input is Mapped<TypeForCheck<Value>> {
    if (input === null || typeof input !== 'object') return false
    for (const key in input) {
      const value = input[key]
      try {
        assertAnyType(valueType, value, strict)
      } catch (error) {
        throw tfSubError(error as Error, key)
      }
    }
    return true
  }, `{${tfString(valueType)}}`)
}

export function map <Value extends Raw> (propType: Value, keyType?: Check<string | number>): Check<Mapped<TypeForCheck<Value>>> {
  if (keyType != null) return mapKeyed(propType, keyType)
  return mapSimple(propType)
}

export function object <Type extends ObjInput> (type: Type): AssertCheck<ObjectTypes<Type>> {
  return addAPI(function _object (value: any, strict?: boolean): value is ObjectTypes<Type> {
    if (value === null || typeof value !== 'object') return false

    for (const propertyName in type) {
      try {
        assertAnyType(type[propertyName], value[propertyName], strict)
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

export function anyOf <T extends Raw[]> (...types: T): MatchCheck<FlattenOr<T>> {
  return addAPI(function _anyOf (value: any, strict?: boolean): value is FlattenOr<T> {
    let i = types.length
    while (i !== 0) {
      try {
        assertAnyType(types[--i], value, strict)
        return true
      } catch (e) {}
    }
    return false
  }, types.map(tfString).join('|'))
}

export function allOf <T extends Array<Check<any>>> (...types: T): Check<FlattenAnd<T>> {
  return addAPI(function _allOf (value: any, strict?: boolean): value is FlattenAnd<T> {
    let i = types.length
    while (i !== 0) {
      try {
        assertAnyType(types[--i], value, strict)
      } catch (e) {
        return false
      }
    }
    return true
  }, types.map(tfString).join('|'))
}

export function tuple <T extends Array<Check<any>>> (...types: T): Check<Tuple<T>> {
  return addAPI(function _tuple (values: any, strict?: boolean): values is Tuple<T> {
    if (values === null || values === undefined) return false
    if (values.length === null || values.length === undefined) return false
    const l = types.length
    if (strict === true && (l !== values.length)) return false

    let i = 0
    while (i !== l) {
      try {
        assertAnyType(types[i], values[i], strict)
      } catch (e) {
        throw tfSubError(e as Error, i.toString())
      }
      i += 1
    }
    return true
  }, `(${types.map(tfString).join(', ')})`)
}
