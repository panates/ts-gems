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
  ]: IfTuple<NonNullable<T[K]>> extends true // Deep process tuples positionally
    ? readonly [...DeeperReadonlyTuple<NonNullable<T[K]>>]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? readonly DeeperReadonly<U>[] | null // Always readonly - that is DeeperReadonly's whole purpose
        : readonly DeeperReadonly<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects
          DeeperReadonly<Exclude<T[K], undefined>>;
};

type DeeperReadonlyTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Head
        : DeeperReadonly<NonNullable<Head>>,
      ...DeeperReadonlyTuple<Rest>,
    ]
  : [];

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
  ]: IfTuple<NonNullable<T[K]>> extends true // Deep process tuples positionally
    ? DeeperPickReadonlyTuple<NonNullable<T[K]>>
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? NonNullable<T[K]> extends any[]
        ? // was mutable - DeeperPickReadonly doesn't touch mutability, unlike DeeperReadonly
          null extends T[K]
          ? DeeperPickReadonly<U>[] | null
          : DeeperPickReadonly<U>[]
        : null extends T[K] // was readonly - preserve that
          ? readonly DeeperPickReadonly<U>[] | null
          : readonly DeeperPickReadonly<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperPickReadonly<Exclude<T[K], undefined>>;
};

type DeeperPickReadonlyTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Head
        : DeeperPickReadonly<NonNullable<Head>>,
      ...DeeperPickReadonlyTuple<Rest>,
    ]
  : [];

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
  ]: IfTuple<NonNullable<T[K]>> extends true // Deep process tuples positionally
    ? DeeperOmitReadonlyTuple<NonNullable<T[K]>>
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? NonNullable<T[K]> extends any[]
        ? // was mutable - DeeperOmitReadonly doesn't touch mutability, unlike DeeperReadonly
          null extends T[K]
          ? DeeperOmitReadonly<U>[] | null
          : DeeperOmitReadonly<U>[]
        : null extends T[K] // was readonly - preserve that
          ? readonly DeeperOmitReadonly<U>[] | null
          : readonly DeeperOmitReadonly<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperOmitReadonly<Exclude<T[K], undefined>>;
};

type DeeperOmitReadonlyTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Head
        : DeeperOmitReadonly<NonNullable<Head>>,
      ...DeeperOmitReadonlyTuple<Rest>,
    ]
  : [];
