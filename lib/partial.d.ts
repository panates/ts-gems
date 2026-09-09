import { IfNoDeepValue } from './helpers.js';
import {
  DeeperOmitRequired,
  DeeperPickRequired,
  DeepOmitRequired,
  DeepPickRequired,
  OmitRequired,
  PickRequired,
} from './required.js';
import { IfNever, IfTuple } from './type-check.js';

/**
 * Marks given keys as optional
 */
export type PartialSome<T, K extends keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>;

/**
 * Partial but deeply
 */
export type DeepPartial<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: IfNoDeepValue<
    // Do not deep process No-Deep values
    Exclude<T[K], undefined>
  > extends true
    ? T[K]
    : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
      DeepPartial<Exclude<T[K], undefined>>;
};

/**
 * Partial but deeply including arrays
 */
export type DeeperPartial<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: IfTuple<
    NonNullable<T[K]>
  > extends true // Deep process tuples positionally
    ? DeeperPartialTuple<NonNullable<T[K]>>
    : NonNullable<
          // Deep process arrays
          T[K]
        > extends readonly (infer U)[]
      ? NonNullable<T[K]> extends any[]
        ? // was mutable - DeeperPartial doesn't touch mutability
          null extends T[K]
          ? DeeperPartial<U>[] | null
          : DeeperPartial<U>[]
        : null extends T[K] // was readonly - preserve that
          ? readonly DeeperPartial<U>[] | null
          : readonly DeeperPartial<U>[]
      : // Do not deep process No-Deep values
        IfNoDeepValue<Exclude<T[K], undefined>> extends true
        ? T[K]
        : // Deep process objects (Exclude, not NonNullable - preserves a `| null` member)
          DeeperPartial<Exclude<T[K], undefined>>;
};

type DeeperPartialTuple<T> = T extends readonly [infer Head, ...infer Rest]
  ? [
      IfNoDeepValue<NonNullable<Head>> extends true
        ? Head
        : DeeperPartial<NonNullable<Head>>,
      ...DeeperPartialTuple<Rest>,
    ]
  : [];

/**
 * OptionalKeys
 * @desc Returns optional keys of an object
 */
export type OptionalKeys<T> = keyof PickOptional<T>;

/**
 * Pick all optional properties in T
 */
export type PickOptional<T> = OmitRequired<T>;

/**
 * Omit all optional properties in T
 */
export type OmitOptional<T> = PickRequired<T>;

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> = DeepOmitRequired<T>;

/**
 * Omit all optional properties in T deeply
 */
export type DeepOmitOptional<T> = DeepPickRequired<T>;

/**
 * Pick all optional properties in T deeply including arrays
 */
export type DeeperPickOptional<T> = DeeperOmitRequired<T>;

/**
 * Omit all optional properties in T deeply including arrays
 */
export type DeeperOmitOptional<T> = DeeperPickRequired<T>;
