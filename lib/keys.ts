import {IfEquals, IsUndefined} from './type-check';

/**
 * Gets optional keys of an object
 */
export type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Gets required keys of an object
 */
export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

/**
 * Gets Function keys of an object
 */
export type FunctionKeys<T> = {
    [K in keyof T]-?: IsUndefined<T[K]> extends false ?
        T[K] extends Function ? K : never : never;
}[keyof T];

/**
 * Gets readonly keys of an object
 */
export type ReadonlyKeys<T> = {
    [K in keyof T]-?: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, never, K>
}[keyof T];

/**
 * Gets readable keys of an object
 */
export type ReadableKeys<T> = Exclude<keyof T, FunctionKeys<T>>;

/**
 * Gets writable keys of an object
 */
export type WritableKeys<T> = Exclude<{
    [K in keyof T]-?: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, K>
}[keyof T], FunctionKeys<T>>;

/**
 * Gets keys that matches V of T
 */
type _TypeKeys<T, V> = {
    [K in keyof T]: IfEquals<T[K], V, K, never>
}[keyof T];
export type TypeKeys<T, V> = _TypeKeys<Required<T>, V>;
