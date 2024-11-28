import { IfNoDeepValue } from './helpers.js';
import { IfNever, IfNull } from './type-check.js';

/**
 * Exclude null and undefined from T deeply
 */
export type UnNullish<T> = {
  [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    IfNull<Exclude<T[K], undefined>, never, K>
  >]: NonNullable<T[K]>;
};

/**
 * Exclude null and undefined from T deeply
 */
export type DeepUnNullish<T> = {
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
      DeepUnNullish<NonNullable<T[K]>>;
};

/**
 * Exclude null and undefined from T deeply including arrays
 */
export type DeeperUnNullish<T> = {
  [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    IfNull<Exclude<T[K], undefined>, never, K>
  >]: NonNullable<NonNullable<T[K]>> extends (infer U)[]
    ? DeeperUnNullish<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? NonNullable<T[K]>
      : // Deep process objects
        DeeperUnNullish<NonNullable<T[K]>>;
};
