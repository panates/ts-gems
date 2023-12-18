import { IfNoDeepValue } from './helpers';
import { Or } from './logical.js';
import { IfEquals, IfNever } from './type-check';

/**
 * Marks given keys as required
 */
export type RequiredSome<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Make all properties in T required deeply
 */
export type DeepRequired<T> = {
  [K in keyof T as (IfNever<Exclude<T[K], undefined>, never, K>)]-?:
  // Do not deep process No-Deep values
  IfNoDeepValue<Exclude<T[K], undefined>> extends true ? Exclude<T[K], undefined>
      // Deep process objects
      : DeepRequired<Exclude<T[K], undefined>>
};


/**
 * Make all properties in T required deeply including arrays
 */
export type DeeperRequired<T> = {
  [K in keyof T as (IfNever<Exclude<T[K], undefined>, never, K>)]-?:
  // Deep process arrays
  Exclude<T[K], undefined> extends (infer U)[] ? DeeperRequired<U>[]
      // Do not deep process No-Deep values
      : IfNoDeepValue<Exclude<T[K], undefined>> extends true ? Exclude<T[K], undefined>
          // Deep process objects
          : DeepRequired<Exclude<T[K], undefined>>
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
  [K in keyof T as (
      Or<
          // Omit never keys
          IfNever<Exclude<T[K], undefined>>,
          // Omit optional
          IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
      > extends true ? never : K
      )]: T[K]
};

/**
 * Pick all required properties in T
 */
export type OmitRequired<T> = {
  [K in keyof T as (
      Or<
          // Omit never keys
          IfNever<Exclude<T[K], undefined>>,
          // Omit optional
          IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }, false, true>
      > extends true ? never : K
      )]: T[K]
};

/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = {
  [K in keyof T as (
      Or<
          // Omit never keys
          IfNever<Exclude<T[K], undefined>>,
          // Omit optional
          IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
      > extends true ? never : K
      )]:
  // Do not deep process No-Deep values
  IfNoDeepValue<Exclude<T[K], undefined>> extends true ? T[K]
      // Deep process objects
      : DeepPickRequired<Exclude<T[K], undefined>>
};

/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = {
  [K in keyof T as (
      Or<
          // Omit never keys
          IfNever<Exclude<T[K], undefined>>,
          // Omit required
          IfEquals<{ [Q in K]: T[K] }, { [Q in K]-?: T[K] }>
      > extends true ? never : K
      )]?:
  // Do not deep process No-Deep values
  IfNoDeepValue<Exclude<T[K], undefined>> extends true ? T[K]
      // Deep process objects
      : DeepOmitRequired<Exclude<T[K], undefined>>
};

/**
 * Pick all required properties in T deeply including arrays
 */
export type DeeperPickRequired<T> = {
  [K in keyof T as (
      Or<
          // Omit never keys
          IfNever<Exclude<T[K], undefined>>,
          // Omit required
          IfEquals<{ [Q in K]: T[K] }, { [Q in K]?: T[K] }>
      > extends true ? never : K
      )]:
  // Deep process arrays
  Exclude<T[K], undefined> extends (infer U)[] ? DeeperPickRequired<U>[]
      // Do not deep process No-Deep values
      : IfNoDeepValue<Exclude<T[K], undefined>> extends true ? T[K]
          // Deep process objects
          : DeeperPickRequired<Exclude<T[K], undefined>>
};

/**
 * Omit all required properties in T deeply including arrays
 */
export type DeeperOmitRequired<T> = {
  [K in keyof T as (
      Or<
          // Omit never keys
          IfNever<Exclude<T[K], undefined>>,
          // Omit required
          IfEquals<{ [Q in K]: T[K] }, { [Q in K]-?: T[K] }>
      > extends true ? never : K
      )]:
  // Deep process arrays
  Exclude<T[K], undefined> extends (infer U)[] ? DeeperOmitRequired<U>[]
      // Do not deep process No-Deep values
      : IfNoDeepValue<Exclude<T[K], undefined>> extends true ? T[K]
          // Deep process objects
          : DeeperOmitRequired<Exclude<T[K], undefined>>
};
