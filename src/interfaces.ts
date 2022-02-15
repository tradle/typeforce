export type RawValidator <T> = (value: any, strict?: boolean) => value is T

export interface Matcher <T> extends RawValidator<T> {
  error: Error | null | undefined
}

export interface Validator <T> extends RawValidator<T> {
  match: Matcher<T>
  assert: RawValidator<T>
  toJSON: () => any
}

export type Maybe <T> = Validator<T | null | undefined>

export interface ArrayOfOptions{
  length?: number
  minLength?: number
  maxLength?: number
}

export type ValidatorType <V> = V extends RawValidator<infer T> ? T : unknown
export type JITType <T> = T extends RawValidator<infer T> ? T : ValidatorType<Compiled<T>>

export type FlattenOr <T extends any[]> =
  T extends [infer A] ?
    ValidatorType<A> :
    T extends [infer A, ...infer R] ?
      ValidatorType<A> | FlattenOr<R> :
      unknown

export type CompiledOr <T extends any[]> =
  T extends [infer A] ?
    ValidatorType<Compiled<A>> :
    T extends [infer A, ...infer R] ?
      ValidatorType<Compiled<A>> | CompiledOr<R> :
      unknown

export interface ObjInput { [key: string]: Validator<any> }
export type ObjectTypes <Type extends ObjInput> = {
  [Property in keyof Type]: Type[Property] extends Validator<infer T> ? T : unknown
}

export interface Mapped <Value> { [key: string | number ]: Value }

export type FlattenAnd <T extends any[]> =
  T extends [infer A] ?
    ValidatorType<A> :
    T extends [infer A, ...infer R] ?
      ValidatorType<A> & FlattenAnd<R> :
      unknown

export type CompiledAnd <T extends any[]> =
T extends [infer A] ?
  ValidatorType<Compiled<A>> :
  T extends [infer A, ...infer R] ?
    ValidatorType<Compiled<A>> & CompiledOr<R> :
    unknown

export type Tuple <T extends any[]> =
  T extends [infer A] ?
      [ValidatorType<A>] :
    T extends [infer A, ...infer R] ?
        [ValidatorType<A>, ...Tuple<R>] :
        []

export type MaybeCompiled <T> = Maybe<Compiled<T>>

export interface ObjectInput { [key: string]: any }
export type ObjectCompiled <T extends ObjectInput> = Validator<{
  [Property in keyof T]: ValidatorType<Compiled<T[Property]>>
}>

export type TupleCompiled<T extends any[]> =
  T extends [infer A] ?
      [Compiled<A>] :
    T extends [infer A, ...infer R] ?
        [Compiled<A>, ...TupleCompiled<R>] :
        []

export interface NativeTypes {
  String: Validator<string>
  Number: Validator<number>
  Validator: Validator<Validator<any>>
  Array: Validator<any[]>
  Boolean: Validator<boolean>
  Function: Validator<Function>
  Nil: Validator<null | undefined>
  Object: Validator<Object>
}

export type TypeNameCompiled <Name extends string> = Name extends keyof NativeTypes
  ? NativeTypes[Name]
  : Validator<Object>

export type StringCompiled <T extends string> =
  T extends `?${infer A}` ?
    Maybe<TypeNameCompiled<A>> :
    TypeNameCompiled<T>

// From: https://stackoverflow.com/a/50375286/62076
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

// If T is `any` a union of both side of the condition is returned.
type UnionForAny<T> = T extends never ? 'A' : 'B'

// Returns true if type is any, or false for any other type.
type IsStrictlyAny<T> =
  UnionToIntersection<UnionForAny<T>> extends never ? true : false

export type Compiled <T> =
  IsStrictlyAny<T> extends true ?
    Validator<any> :
    T extends null | undefined ?
      Validator<null | undefined> :
      T extends string ?
        StringCompiled<T> :
        T extends Validator<any> ?
          T :
          T extends Function ?
            Validator<unknown> :
            T extends ObjectInput ?
              ObjectCompiled<T> :
              Validator<T>

export type AnyOfCompiled <T extends any[]> = Validator<CompiledOr<T>>
export type AllOfCompiled <T extends any[]> = Validator<CompiledAnd<T>>
export type ArrayCompiled <T> = Validator<Array<ValidatorType<Compiled<T>>>>
