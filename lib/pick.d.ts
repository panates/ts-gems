import {
  JsonKeys,
  OptionalKeys,
  ReadonlyKeys,
  RequiredKeys,
  WritableKeys
} from './keys';

/**
 * Pick all optional properties in T
 */
export type PickOptional<T> = Pick<T, OptionalKeys<T>>;

/**
 * Pick all required properties in T
 */
export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

/**
 * Pick all readonly properties in T
 */
export type PickReadonly<T> = Pick<T, ReadonlyKeys<T>>;


/**
 * Pick all writable properties in T
 */
export type PickWritable<T> = Pick<T, WritableKeys<T>>;

/**
 * Pick all JSON friendly properties (no symbols) in T
 */
export type PickJson<T> = Pick<T, JsonKeys<T>>;
