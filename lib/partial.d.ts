import { IfNoDeepValue } from './helpers.js';
import {
  DeeperOmitRequired,
  DeeperPickRequired,
  DeepOmitRequired,
  DeepPickRequired,
  OmitRequired,
  PickRequired,
} from './required.js';
import { IfNever } from './type-check.js';

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
    : // Deep process objects
      DeepPartial<NonNullable<T[K]>>;
};

/**
 * Partial but deeply including arrays
 */
export type DeeperPartial<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]?: NonNullable<
    // Deep process arrays
    T[K]
  > extends (infer U)[]
    ? DeeperPartial<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? T[K]
      : // Deep process objects
        DeeperPartial<NonNullable<T[K]>>;
};

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
