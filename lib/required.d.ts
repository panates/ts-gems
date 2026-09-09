import { IfNoDeepValue } from './helpers.js';
import { Or } from './logical.js';
import { IfEquals, IfNever, IfTuple } from './type-check.js';

/**
 * Marks given keys as required
 */
export type RequiredSome<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

/**
 * Make all properties in T required deeply
 */
export type DeepRequired<T> = {
  [
    K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>
  ]-?: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? Exclude<T[K], undefined>
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepRequired<Exclude<T[K], undefined>>;
};

/**
 * Make all properties in T required deeply including arrays
 */
export type DeeperRequired<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]-?: IfTuple<
    NonNullable<T[K]>
  > extends true // Leave fixed-length tuples untouched
    ? Exclude<T[K], undefined>
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperRequired<U>[] | null
        : DeeperRequired<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? Exclude<T[K], undefined>
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperRequired<Exclude<T[K], undefined>>;
};

/**
 * RequiredKeys
 * @desc Returns required keys of an object
 */
export type RequiredKeys<T> = keyof PickRequired<T>;

/**
 * Pick all required properties in T
 */
export type PickRequired<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit optional
      IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
    > extends true
      ? never
      : K
  ]: T[K];
};

/**
 * Pick all required properties in T
 */
export type OmitRequired<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit optional
      IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }, false, true>
    > extends true
      ? never
      : K
  ]: T[K];
};

/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit optional
      IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
    > extends true
      ? never
      : K
  ]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepPickRequired<Exclude<T[K], undefined>>;
};

/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { [Q in K]-?: T[K] }>
    > extends true
      ? never
      : K
  ]?: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepOmitRequired<Exclude<T[K], undefined>>;
};

/**
 * Pick all required properties in T deeply including arrays
 */
export type DeeperPickRequired<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
    > extends true
      ? never
      : K
  ]: IfTuple<NonNullable<T[K]>> extends true // Leave fixed-length tuples untouched
    ? T[K]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperPickRequired<U>[] | null
        : DeeperPickRequired<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperPickRequired<Exclude<T[K], undefined>>;
};

/**
 * Omit all required properties in T deeply including arrays
 */
export type DeeperOmitRequired<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit required
      IfEquals<{ [Q in K]: T[K] }, { [Q in K]-?: T[K] }>
    > extends true
      ? never
      : K
  ]: IfTuple<NonNullable<T[K]>> extends true // Leave fixed-length tuples untouched
    ? T[K]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperOmitRequired<U>[] | null
        : DeeperOmitRequired<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperOmitRequired<Exclude<T[K], undefined>>;
};
