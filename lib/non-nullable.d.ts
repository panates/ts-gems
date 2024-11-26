import { IfNoDeepValue } from './helpers.js';
import { IfNever, IfNull } from './type-check.js';

/**
 * Exclude null and undefined from T deeply
 */
export type DeepNonNullable<T> = {
  [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    IfNull<Exclude<T[K], undefined>, never, K>
  >]: IfNoDeepValue<
    // Do not deep process No-Deep values
    Exclude<T[K], undefined>
  > extends true
    ? NonNullable<T[K]>
    : // Deep process objects
      DeepNonNullable<NonNullable<T[K]>>;
};

/**
 * Exclude null and undefined from T deeply including arrays
 */
export type DeeperNonNullable<T> = {
  [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    IfNull<Exclude<T[K], undefined>, never, K>
  >]: NonNullable<Exclude<T[K], undefined>> extends (infer U)[]
    ? DeeperNonNullable<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<Exclude<T[K], undefined>> extends true
      ? NonNullable<T[K]>
      : // Deep process objects
        DeeperNonNullable<NonNullable<T[K]>>;
};
