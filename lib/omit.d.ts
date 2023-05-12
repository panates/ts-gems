import {
  JsonKeys,
  OptionalKeys,
  ReadonlyKeys,
  RequiredKeys,
  WritableKeys
} from './keys';

export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Omit all optional properties in T
 */
export type OmitOptional<T> = Omit<T, OptionalKeys<T>>;

/**
 * Omit all required properties in T
 */
export type OmitRequired<T> = Omit<T, RequiredKeys<T>>;

/**
 * Omit all readonly properties in T
 */
export type OmitReadonly<T> = Omit<T, ReadonlyKeys<T>>;


/**
 * Omit all writable properties in T
 */
export type OmitWritable<T> = Omit<T, WritableKeys<T>>;

/**
 * Omit all JSON friendly properties in T
 */
export type OmitJson<T> = Omit<T, JsonKeys<T>>;
