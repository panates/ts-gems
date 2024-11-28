import { IfNoDeepValue } from './helpers.js';
import { Or } from './logical.js';
import { IfFunction, IfNever } from './type-check.js';

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
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit functions
    IfFunction<NonNullable<T[K]>>
  > extends true
    ? never
    : K]: T[K];
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
  [K in keyof T as IfNever<
    Exclude<T[K], undefined | X>,
    never,
    K
  >]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? Exclude<T[K], X>
    : // Deep process objects
      DeepOmitTypes<NonNullable<T[K]>, X>;
};

/**
 * Omit all function properties in T deeply including arrays
 */
export type DeeperOmitTypes<T, X> = {
  [K in keyof T as IfNever<
    Exclude<T[K], undefined | X>,
    never,
    K
  >]: NonNullable<
    // Deep process arrays // Do not deep process No-Deep values
    T[K]
  > extends (infer U)[]
    ? DeeperOmitTypes<U, X>[]
    : IfNoDeepValue<NonNullable<T[K]>> extends true
      ? Exclude<T[K], X>
      : // Deep process objects
        DeeperOmitTypes<NonNullable<T[K]>, X>;
};
