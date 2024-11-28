import { IfNoDeepValue } from './helpers.js';
import { IfNever } from './type-check.js';

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
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: NonNullable<
    // Deep process arrays
    T[K]
  > extends (infer U)[]
    ? DeeperNullish<U>[] | null
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? T[K] | null
      : // Deep process objects
        DeeperNullish<NonNullable<T[K]>> | null;
};
