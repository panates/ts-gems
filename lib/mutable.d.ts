import { IfNoDeepValue } from './helpers.js';
import {
  DeeperOmitReadonly,
  DeeperPickReadonly,
  DeepOmitReadonly,
  DeepPickReadonly,
  OmitReadonly,
  PickReadonly,
} from './readonly.js';
import { IfNever } from './type-check.js';

/**
 * Make all properties in T mutable
 */
export type Mutable<T> = {
  -readonly [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]: T[K];
};

/**
 * Marks given keys as mutable
 */
export type MutableSome<T, K extends keyof T> = Mutable<Pick<T, K>> &
  Omit<T, K>;

/**
 * Make all properties in T mutable deeply
 */
export type DeepMutable<T> = {
  -readonly [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    K
  >]: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects
      DeepMutable<NonNullable<T[K]>>;
};

/**
 * Make all properties in T mutable deeply
 */
export type DeeperMutable<T> = {
  -readonly [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    K
  >]: NonNullable<T[K]> extends (infer U)[] // Deep process arrays
    ? DeeperMutable<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? T[K]
      : // Deep process objects
        DeeperMutable<NonNullable<T[K]>>;
};

/**
 * Returns mutable keys of an object
 */
export type MutableKeys<T> = keyof OmitReadonly<T>;

/**
 * Pick all mutable properties in T
 */
export type PickMutable<T> = OmitReadonly<T>;

/**
 * Omit all mutable properties in T
 */
export type OmitMutable<T> = PickReadonly<T>;

/**
 * Pick all mutable properties in T deeply
 */
export type DeepPickMutable<T> = DeepOmitReadonly<T>;

/**
 * Pick all mutable properties in T deeply
 */
export type DeepOmitMutable<T> = DeepPickReadonly<T>;

/**
 * Pick all mutable properties in T deeply including arrays
 */
export type DeeperPickMutable<T> = DeeperOmitReadonly<T>;

/**
 * Pick all mutable properties in T deeply including arrays
 */
export type DeeperOmitMutable<T> = DeeperPickReadonly<T>;
