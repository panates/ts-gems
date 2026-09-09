import { IfNoDeepValue } from './helpers.js';
import { IfNever, IfNull, IfTuple } from './type-check.js';

/**
 * Exclude null and undefined from T deeply
 */
export type UnNullish<T> = {
  [
    K in keyof T as IfNever<
      Exclude<T[K], undefined>,
      never,
      IfNull<Exclude<T[K], undefined>, never, K>
    >
  ]: NonNullable<T[K]>;
};

/**
 * Exclude null and undefined from T deeply
 */
export type DeepUnNullish<T> = {
  [
    K in keyof T as IfNever<
      Exclude<T[K], undefined>,
      never,
      IfNull<Exclude<T[K], undefined>, never, K>
    >
  ]: IfNoDeepValue<
    // Do not deep process No-Deep values
    Exclude<T[K], undefined>
  > extends true
    ? NonNullable<T[K]>
    : // Deep process objects
      DeepUnNullish<NonNullable<T[K]>>;
};

/**
 * Exclude null and undefined from T deeply including arrays
 */
export type DeeperUnNullish<T> = {
  [
    K in keyof T as IfNever<
      Exclude<T[K], undefined>,
      never,
      IfNull<Exclude<T[K], undefined>, never, K>
    >
  ]: IfTuple<NonNullable<T[K]>> extends true // Deep process tuples positionally
    ? DeeperUnNullishTuple<NonNullable<T[K]>>
    : NonNullable<NonNullable<T[K]>> extends readonly (infer U)[]
      ? NonNullable<T[K]> extends any[]
        ? DeeperUnNullish<U>[] // was mutable - UnNullish doesn't touch mutability
        : readonly DeeperUnNullish<U>[] // was readonly - preserve that
      : // Do not deep process No-Deep values
        IfNoDeepValue<NonNullable<T[K]>> extends true
        ? NonNullable<T[K]>
        : // Deep process objects
          DeeperUnNullish<NonNullable<T[K]>>;
};

type DeeperUnNullishTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? NonNullable<Head>
        : DeeperUnNullish<NonNullable<Head>>,
      ...DeeperUnNullishTuple<Rest>,
    ]
  : [];
