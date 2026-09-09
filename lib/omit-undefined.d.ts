import { IfNoDeepValue } from './helpers.js';
import { IfNever, IfTuple } from './type-check.js';

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
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: IfTuple<
    NonNullable<T[K]>
  > extends true // Leave fixed-length tuples untouched
    ? T[K]
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? null extends T[K] // Preserve a `| null` member lost by NonNullable above
        ? DeeperOmitUndefined<U>[] | null
        : DeeperOmitUndefined<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperOmitUndefined<Exclude<T[K], undefined>>;
};
