import { IfNoDeepValue } from './helpers.js';
import { Or } from './logical.js';
import { OmitTypes } from './omit.js';
import { IfEquals, IfNever } from './type-check.js';

/**
 * Marks given keys as required
 */
export type RequiredSome<T, K extends keyof T> = OmitTypes<
  Required<Pick<T, K>>,
  null
> &
  Omit<T, K>;

/**
 * Make all properties in T required deeply
 */
export type DeepRequired<T> = {
  [K in keyof T as IfNever<
    Exclude<T[K], undefined>,
    never,
    K
  >]-?: IfNoDeepValue<Exclude<T[K], undefined>> extends true // Do not deep process No-Deep values
    ? Exclude<T[K], undefined>
    : // Deep process objects
      DeepRequired<NonNullable<T[K]>>;
};

/**
 * Make all properties in T required deeply including arrays
 */
export type DeeperRequired<T> = {
  [K in keyof T as IfNever<Exclude<T[K], undefined>, never, K>]-?: NonNullable<
    T[K]
  > extends (infer U)[] // Deep process arrays
    ? DeeperRequired<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? Exclude<T[K], undefined>
      : // Deep process objects
        DeepRequired<NonNullable<T[K]>>;
};

/**
 * RequiredKeys
 * @desc Returns required keys of an object
 */
export type RequiredKeys<T> = keyof PickRequired<T>;

/**
 * Pick all required properties in T
 */
export type PickRequired<T> = {
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit optional
    IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
  > extends true
    ? never
    : K]: T[K];
};

/**
 * Pick all required properties in T
 */
export type OmitRequired<T> = {
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit optional
    IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }, false, true>
  > extends true
    ? never
    : K]: T[K];
};

/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = {
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit optional
    IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
  > extends true
    ? never
    : K]: IfNoDeepValue<NonNullable<T[K]>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects
      DeepPickRequired<NonNullable<T[K]>>;
};

/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = {
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit required
    IfEquals<{ [Q in K]: T[K] }, { [Q in K]-?: T[K] }>
  > extends true
    ? never
    : K]?: IfNoDeepValue<NonNullable<T[K]>> extends true // Do not deep process No-Deep values
    ? T[K]
    : // Deep process objects
      DeepOmitRequired<NonNullable<T[K]>>;
};

/**
 * Pick all required properties in T deeply including arrays
 */
export type DeeperPickRequired<T> = {
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit required
    IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
  > extends true
    ? never
    : K]: NonNullable<T[K]> extends (infer U)[] // Deep process arrays
    ? DeeperPickRequired<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? T[K]
      : // Deep process objects
        DeeperPickRequired<NonNullable<T[K]>>;
};

/**
 * Omit all required properties in T deeply including arrays
 */
export type DeeperOmitRequired<T> = {
  [K in keyof T as Or<
    // Omit never keys
    IfNever<Exclude<T[K], undefined>>,
    // Omit required
    IfEquals<{ [Q in K]: T[K] }, { [Q in K]-?: T[K] }>
  > extends true
    ? never
    : K]: NonNullable<T[K]> extends (infer U)[] // Deep process arrays
    ? DeeperOmitRequired<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? T[K]
      : // Deep process objects
        DeeperOmitRequired<NonNullable<T[K]>>;
};
