export type Raw = (value: any, strict?: boolean) => any
export type RawMatcher <T> = (value: any, strict?: boolean) => value is T

export interface Match <T> extends RawMatcher<T> {
  error: Error | null | undefined
}

export type Assert <T> = (value: any, strict?: boolean) => asserts value is T

export type AnyRaw <T> = Raw | Match<T> | Assert<T>

export type AssertType <T> = (type: AnyRaw<T>, value: T, strict?: boolean) => asserts value is T

export interface Check<T> extends Raw {
  match: Match<T>
  assert: Assert<T>
  toJSON: () => any
}

export type DerivedCheck <T extends Raw, Value> =
  T extends (value: any, strict?: boolean) => value is any
    ? MatchCheck<Value>
    : T extends (value: any, strict?: boolean) => asserts value is any
      ? AssertCheck<Value>
      : Check<unknown>

export interface MatchCheck <T> extends Match<T>, Check<T> {}
export interface AssertCheck <T> extends Assert<T>, Check<T> {}

export type CheckForRaw <T extends Raw> =
  T extends (value: any, strict?: boolean) => value is infer U
    ? MatchCheck<U>
    : T extends (value: any, strict?: boolean) => asserts value is infer U
      ? AssertCheck<U>
      : Check<unknown>

export type TypeForCheck <T extends Raw> =
  T extends MatchCheck<infer U>
    ? U
    : T extends AssertCheck<infer U>
      ? U
      : T extends (value: any, strict?: boolean) => value is infer U
        ? U
        : T extends (value: any, strict?: boolean) => asserts value is infer U
          ? U
          : unknown

export type Maybe <T> = T | null | undefined

export interface ArrayOfOptions{
  length?: number
  minLength?: number
  maxLength?: number
}

export type JITType <Input> = Input extends RawMatcher<infer T> ? T : Input extends Assert<infer T> ? T : TypeForCheck<Compiled<Input>>

export type FlattenOr <T extends any[]> =
  T extends [infer A]
    ? TypeForAny<A>
    : T extends [infer A, ...infer R]
      ? TypeForAny<A> | FlattenOr<R>
      : unknown

export type CompiledOr <T extends any[]> =
  T extends [infer A]
    ? TypeForCheck<Compiled<A>>
    : T extends [infer A, ...infer R]
      ? TypeForCheck<Compiled<A>> | CompiledOr<R>
      : unknown

export interface ObjInput { [key: string]: Raw }
export type ObjectTypes <Type extends ObjInput> = {
  [Property in keyof Type]: TypeForCheck<Type[Property]>
}

export interface Mapped <Value> { [key: string | number ]: Value }

export type FlattenAnd <T extends any[]> =
  T extends [infer A]
    ? TypeForAny<A>
    : T extends [infer A, ...infer R]
      ? TypeForAny<A> & FlattenAnd<R>
      : unknown

export type CompiledAnd <T extends any[]> =
T extends [infer A]
  ? TypeForCheck<Compiled<A>>
  : T extends [infer A, ...infer R]
    ? TypeForCheck<Compiled<A>> & CompiledOr<R>
    : unknown

export type TypeForAny <T> = T extends Raw ? TypeForCheck<T> : unknown

export type Tuple <T extends any[]> =
  T extends [infer A]
    ? [TypeForAny<A>]
    : T extends [infer A, ...infer R]
      ? [TypeForAny<A>, ...Tuple<R>]
      : []

export type MaybeCompiled <T> = DerivedCheck<Compiled<T>, Maybe<TypeForCheck<Compiled<T>>>>

export interface ObjectInput { [key: string]: any }
export type ObjectCompiled <T extends ObjectInput> = Check<{
  [Property in keyof T]: TypeForCheck<Compiled<T[Property]>>
}>

export type TupleCompiled<T extends any[]> =
  T extends [infer A]
    ? [Compiled<A>]
    : T extends [infer A, ...infer R]
      ? [Compiled<A>, ...TupleCompiled<R>]
      : []

export interface NativeTypes {
  String: MatchCheck<string>
  Number: MatchCheck<number>
  Validator: MatchCheck<Check<any>>
  Array: MatchCheck<any[]>
  Boolean: MatchCheck<boolean>
  Function: MatchCheck<Function>
  Nil: MatchCheck<null | undefined>
  Object: MatchCheck<Object>
}

export type TypeNameCompiled <Name extends string> = Name extends keyof NativeTypes
  ? NativeTypes[Name]
  : Check<Object>

export type StringCompiled <T extends string> =
  T extends `?${infer A}`
    ? Maybe<TypeNameCompiled<A>>
    : TypeNameCompiled<T>

// From: https://stackoverflow.com/a/50375286/62076
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

// If T is `any` a union of both side of the condition is returned.
type UnionForAny<T> = T extends never ? 'A' : 'B'

// Returns true if type is any, or false for any other type.
type IsStrictlyAny<T> =
  UnionToIntersection<UnionForAny<T>> extends never ? true : false

type FunctionCompiled <T extends Function> = Check<TypeForAny<T>>

export type Compiled <T> =
  IsStrictlyAny<T> extends true
    ? Check<any>
    : T extends null | undefined
      ? Check<null | undefined>
      : T extends string
        ? StringCompiled<T>
        : T extends Check<any>
          ? T
          : T extends Function
            ? FunctionCompiled<T>
            : T extends ObjectInput
              ? ObjectCompiled<T>
              : Check<T>

export type AnyOfCompiled <T extends any[]> = Check<CompiledOr<T>>
export type AllOfCompiled <T extends any[]> = Check<CompiledAnd<T>>
export type ArrayCompiled <T> = Check<Array<TypeForCheck<Compiled<T>>>>
