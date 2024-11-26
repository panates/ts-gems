import { IfNoDeepValue } from './helpers.js';
import { IfNever } from './type-check.js';

/**
 * OmitUndefined<T> is a type that omits all properties with a value of type "undefined".
 */
export type OmitUndefined<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: T[K];
};

/**
 * Omit all "never" and "undefined" properties in T deeply
 */
export type DeepOmitUndefined<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: IfNoDeepValue<
    // Do not deep process No-Deep values
    Exclude<T[K], undefined>
  > extends true
    ? T[K]
    : // Deep process objects
      DeepOmitUndefined<Exclude<T[K], undefined>>;
};

/**
 * Omit all "never" and "undefined" properties in T deeply including arrays
 */
export type DeeperOmitUndefined<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: Exclude<
    // Deep process arrays
    T[K],
    undefined
  > extends (infer U)[]
    ? DeeperOmitUndefined<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<Exclude<T[K], undefined>> extends true
      ? T[K]
      : // Deep process objects
        DeeperOmitUndefined<Exclude<T[K], undefined>>;
};
