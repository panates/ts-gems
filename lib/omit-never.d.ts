import { IfNoDeepValue } from './helpers.js';
import { IfNever, IfTuple } from './type-check.js';

/**
 * OmitNever<T> is a type that omits all properties with a value of type "never".
 *
 * @template T - The original type
 *
 * @example
 * type MyType = {
 *   a: string;
 *   b: number;
 *   c?: never;
 * };
 *
 * type Result = OmitNever<MyType>;
 * // Result is:
 * // {
 * //   a: string;
 * //   b: number;
 * // }
 */
export type OmitNever<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: T[K];
};

/**
 * Omit all "never" and "undefined" properties in T deeply
 */
export type DeepOmitNever<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: IfNoDeepValue<
    // Do not deep process No-Deep values
    Exclude<T[K], undefined>
  > extends true
    ? T[K]
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepOmitNever<Exclude<T[K], undefined>>;
};

/**
 * Omit all "never" and "undefined" properties in T deeply including arrays
 */
export type DeeperOmitNever<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: IfTuple<
    NonNullable<T[K]>
  > extends true // Deep process tuples positionally
    ? DeeperOmitNeverTuple<NonNullable<T[K]>>
    : NonNullable<
          // Deep process arrays
          T[K]
        > extends readonly (infer U)[]
      ? NonNullable<T[K]> extends any[]
        ? // was mutable - DeeperOmitNever doesn't touch mutability
          null extends T[K]
          ? DeeperOmitNever<U>[] | null
          : DeeperOmitNever<U>[]
        : null extends T[K] // was readonly - preserve that
          ? readonly DeeperOmitNever<U>[] | null
          : readonly DeeperOmitNever<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperOmitNever<Exclude<T[K], undefined>>;
};

type DeeperOmitNeverTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Head
        : DeeperOmitNever<NonNullable<Head>>,
      ...DeeperOmitNeverTuple<Rest>,
    ]
  : [];
