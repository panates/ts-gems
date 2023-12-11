import {
  JsonKeys,
  OptionalKeys,
  ReadonlyKeys,
  RequiredKeys,
  WritableKeys
} from './keys';

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
  [K in keyof T as (Exclude<T[K], undefined> extends never ? never : K)]: T[K]
};

/**
 * Construct a type with the properties of T except for those in type K,
 * while preserving strict type checking.
 *
 * @template T - The original type.
 * @template K - The keys of the properties to be removed from the original type.
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Omit all optional properties in T
 */
export type OmitOptional<T> = OmitNever<Omit<T, OptionalKeys<T>>>;

/**
 * Omit all required properties in T
 */
export type OmitRequired<T> = OmitNever<Omit<T, RequiredKeys<T>>>;

/**
 * Omit all readonly properties in T
 */
export type OmitReadonly<T> = OmitNever<Omit<T, ReadonlyKeys<T>>>;


/**
 * Omit all writable properties in T
 */
export type OmitWritable<T> = OmitNever<Omit<T, WritableKeys<T>>>;

/**
 * Omit all JSON friendly properties in T
 */
export type OmitJson<T> = OmitNever<Omit<T, JsonKeys<T>>>;
