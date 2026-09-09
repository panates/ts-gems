import { IfNoDeepValue } from './helpers.js';
import { Or } from './logical.js';
import { IfFunction, IfNever, IfTuple } from './type-check.js';

/**
 * Construct a type with the properties of T except for those in type K,
 * while preserving strict type checking.
 */
export type StrictOmit<T, X extends keyof T> = {
  [K in keyof T as K extends X ? never : K]: T[K];
};

/**
 * Omit all function properties in T
 */
export type OmitFunctions<T> = {
  [
    K in keyof T as Or<
      // Omit never keys
      IfNever<Exclude<T[K], undefined>>,
      // Omit functions
      IfFunction<NonNullable<T[K]>>
    > extends true
      ? never
      : K
  ]: T[K];
};

/**
 * Exclude from properties of T those types that are assignable to X
 */
export type OmitTypes<T, X> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined | X>, never, K>]: Exclude<
    T[K],
    X
  >;
};

/**
 * Omit all function properties in T
 */
export type DeepOmitTypes<T, X> = {
  [
    K in keyof T as IfNever<Exclude<T[K], undefined | X>, never, K>
  ]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? Exclude<T[K], X>
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepOmitTypes<Exclude<T[K], undefined>, X>;
};

/**
 * Omit all function properties in T deeply including arrays
 */
export type DeeperOmitTypes<T, X> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined | X>, never, K>]: IfTuple<
    NonNullable<T[K]>
  > extends true // Deep process tuples positionally
    ? DeeperOmitTypesTuple<NonNullable<T[K]>, X>
    : NonNullable<
          // Deep process arrays // Do not deep process No-Deep values
          T[K]
        > extends readonly (infer U)[]
      ? NonNullable<T[K]> extends any[]
        ? // was mutable - DeeperOmitTypes doesn't touch mutability
          null extends T[K]
          ? DeeperOmitTypes<U, X>[] | null
          : DeeperOmitTypes<U, X>[]
        : null extends T[K] // was readonly - preserve that
          ? readonly DeeperOmitTypes<U, X>[] | null
          : readonly DeeperOmitTypes<U, X>[]
      : IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? Exclude<T[K], X>
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperOmitTypes<Exclude<T[K], undefined>, X>;
};

type DeeperOmitTypesTuple<T, X> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Exclude<Head, X>
        : DeeperOmitTypes<NonNullable<Head>, X>,
      ...DeeperOmitTypesTuple<Rest, X>,
    ]
  : [];
