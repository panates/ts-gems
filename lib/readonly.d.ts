import { IfNoDeepValue } from './helpers.js';
import { Or } from './logical.js';
import { IfEquals, IfNever, IfTuple } from './type-check.js';

/**
 * Marks given keys as readonly
 */
export type ReadonlySome<T, K extends keyof T> = Readonly<Pick<T, K>> &
  Omit<T, K>;

/**
 * Make all properties in T readonly deeply
 */
export type DeepReadonly<T> = {
  readonly [
    K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>
  ]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects
      DeepReadonly<Exclude<T[K], undefined>>;
};

/**
 * Make all properties in T readonly deeply
 */
export type DeeperReadonly<T> = {
  readonly [
    K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>
  ]: IfTuple<NonNullable<T[K]>> extends true // Leave fixed-length tuples untouched
    ? T[K]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperReadonly<U>[] | null
        : DeeperReadonly<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects
          DeeperReadonly<Exclude<T[K], undefined>>;
};

/**
 * Returns readonly keys of an object
 */
export type ReadonlyKeys<T> = keyof PickReadonly<T>;

/**
 * Pick all readonly properties in T
 */
export type PickReadonly<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }, false, true>
    > extends true
      ? never
      : K
  ]: T[K];
};

/**
 * Omit all readonly properties in T
 */
export type OmitReadonly<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }>
    > extends true
      ? never
      : K
  ]: T[K];
};

/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }, false, true>
    > extends true
      ? never
      : K
  ]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepPickReadonly<Exclude<T[K], undefined>>;
};

/**
 * Pick all readonly properties in T deeply
 */
export type DeepOmitReadonly<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }>
    > extends true
      ? never
      : K
  ]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepOmitReadonly<Exclude<T[K], undefined>>;
};

/**
 * Pick all readonly properties in T deeply including arrays
 */
export type DeeperPickReadonly<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }, false, true>
    > extends true
      ? never
      : K
  ]: IfTuple<NonNullable<T[K]>> extends true // Leave fixed-length tuples untouched
    ? T[K]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperPickReadonly<U>[] | null
        : DeeperPickReadonly<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperPickReadonly<Exclude<T[K], undefined>>;
};

/**
 * Pick all readonly properties in T deeply including arrays
 */
export type DeeperOmitReadonly<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }>
    > extends true
      ? never
      : K
  ]: IfTuple<NonNullable<T[K]>> extends true // Leave fixed-length tuples untouched
    ? T[K]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperOmitReadonly<U>[] | null
        : DeeperOmitReadonly<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperOmitReadonly<Exclude<T[K], undefined>>;
};
