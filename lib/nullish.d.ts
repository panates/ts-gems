import { IfNoDeepValue } from './helpers.js';
import { IfNever, IfTuple } from './type-check.js';

/**
 * Make all properties in T nullish
 */
export type NullishObject<T = null> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: T[K] | null;
};

/**
 * Make all properties in T nullish deeply
 */
export type DeepNullish<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: IfNoDeepValue<
    // Do not deep process No-Deep values
    Exclude<T[K], undefined>
  > extends true
    ? T[K] | null
    : // Deep process objects
      DeepNullish<NonNullable<T[K]>> | null;
};

/**
 * Make all properties in T nullish deeply including arrays
 */
export type DeeperNullish<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: IfTuple<
    NonNullable<T[K]>
  > extends true // Deep process tuples positionally
    ? DeeperNullishTuple<NonNullable<T[K]>> | null
    : NonNullable<
          // Deep process arrays
          T[K]
        > extends readonly (infer U)[]
      ? NonNullable<T[K]> extends any[]
        ? DeeperNullish<U>[] | null // was mutable - DeeperNullish doesn't touch mutability
        : readonly DeeperNullish<U>[] | null // was readonly - preserve that
      : // Do not deep process No-Deep values
        IfNoDeepValue<NonNullable<T[K]>> extends true
        ? T[K] | null
        : // Deep process objects
          DeeperNullish<NonNullable<T[K]>> | null;
};

type DeeperNullishTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Head
        : DeeperNullish<NonNullable<Head>>,
      ...DeeperNullishTuple<Rest>,
    ]
  : [];
