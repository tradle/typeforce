import type {
  ArrayCompiled, ArrayOfOptions, Compiled, Mapped,
  MaybeCompiled, ObjectCompiled, ObjectInput, RawValidator,
  TupleCompiled, Validator, TypeNameCompiled, StringCompiled,
  AnyOfCompiled, AllOfCompiled, ValidatorType, JITType, Tuple
} from './interfaces'
import * as NATIVE from './native'
import * as COMBINE from './combine'
import { getValueTypeName, addAPI } from './errors'

export function arrayOf <T> (type: T, options?: ArrayOfOptions): ArrayCompiled<T> {
  return COMBINE.arrayOf(compile(type), options) as ArrayCompiled<T>
}

export function maybe <T> (type: T): MaybeCompiled<T> {
  return COMBINE.maybe(compile(type)) as MaybeCompiled<T>
}

export function map <Value extends any> (valueType: Value, keyType?: any): Validator<Mapped<Compiled<Value>>> {
  let key: Validator<any> | undefined
  if (keyType !== undefined && keyType !== undefined) {
    key = compile(keyType)
  }
  return COMBINE.map(compile(valueType), key) as Validator<Mapped<Compiled<Value>>>
}

export function object <T extends ObjectInput> (uncompiled: T): ObjectCompiled<T> {
  const type: { [key: string]: Validator<any> } = {}
  for (const typePropertyName in uncompiled) {
    type[typePropertyName] = compile(uncompiled[typePropertyName])
  }
  return COMBINE.object(type) as unknown as ObjectCompiled<T>
}

export function anyOf <T extends any[]> (...uncompiled: T): AnyOfCompiled<T> {
  const types = uncompiled.map(compile)
  return COMBINE.anyOf(...types) as AnyOfCompiled<T>
}

export function allOf <T extends any[]> (...uncompiled: T): AllOfCompiled<T> {
  const types = uncompiled.map(compile)
  return COMBINE.allOf(...types) as AllOfCompiled<T>
}

export function quacksLike (typeName: string): Validator<Object> {
  const obj = {
    [typeName] (value: any): value is Object {
      return typeName === getValueTypeName(value)
    }
  }
  return addAPI(obj[typeName])
}

export function tuple <T extends any[]> (...uncompiled: T): Validator<Tuple<TupleCompiled<T>>> {
  const types = uncompiled.map(compile)
  return COMBINE.tuple(...types) as Validator<Tuple<TupleCompiled<T>>>
}

export function value <T=any> (expected: T): Validator<T> {
  // TODO: Wrap with <> and replace <> with &gt;
  const name = String(expected)
  const obj = {
    // To make sure that the function gets named correctly
    [name] (actual: any): actual is T {
      return actual === expected
    }
  }
  return addAPI(obj[name])
}

export function compileTypeName <Name extends string> (typeName: Name): TypeNameCompiled<Name> {
  if (typeName in NATIVE) {
    return NATIVE[typeName as keyof typeof NATIVE] as TypeNameCompiled<Name>
  }
  return quacksLike(typeName) as TypeNameCompiled<Name>
}

export function compileString <T extends string> (input: T): StringCompiled<T> {
  if (input[0] === '?') {
    return COMBINE.maybe(
      compileTypeName(input.slice(1))
    ) as StringCompiled<T>
  }
  return compileTypeName(input) as StringCompiled<T>
}

export function compile <T> (type: T): Compiled<T> {
  if (NATIVE.Validator(type)) {
    return type as unknown as Compiled<T>
  }

  if (typeof type === 'string') {
    return compileString(type) as Compiled<T>
  }

  if (Array.isArray(type)) {
    if (type.length !== 1) {
      throw new TypeError('Expected compile() parameter of type Array of length 1')
    }
    return arrayOf(type[0]) as Compiled<T>
  }

  if (type !== null && typeof type === 'object') {
    return object(type) as Compiled<T>
  }

  if (NATIVE.Function(type)) {
    return addAPI(type as unknown as RawValidator<any>) as Compiled<T>
  }

  return value(type) as Compiled<T>
}

export const match = (<Type> (type: Type, value: any, strict?: boolean): value is JITType<Type> => {
  try {
    assert(type, value, strict)
  } catch (err) {
    match.error = err as Error
    return false
  }
  return true
}) as (<Type> (type: any, value: any, strict?: boolean) => value is JITType<Type>) & {
  error: Error | null | undefined
}

export function assert <Type> (type: Type, value: any, strict?: boolean):
  value is (Type extends RawValidator<any> ? ValidatorType<Type> : ValidatorType<Compiled<Type>>) {
  return (NATIVE.Validator(type) ? type : compile(type)).assert(value, strict)
}
