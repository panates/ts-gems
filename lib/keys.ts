import {IfEquals, IsEquals} from './type-check';

/**
 * Gets optional keys of an object
 */
export type OptionalKeys<T> = keyof {
    [K in keyof T as IsEquals<{ [P in K]+?: T[K]; }, { [P in K]: T[K]; }> extends true
        ? K
        : never
    ]: T[K];
};


/**
 * Gets required keys of an object
 */
export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

/**
 * Gets readonly keys of an object
 */
export type ReadonlyKeys<T> = {
    [K in keyof T]-?: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, never, K>
}[keyof T];

/**
 * Gets readonly keys of an object
 */
export type WritableKeys<T> = Exclude<keyof T, ReadonlyKeys<T>>;

/**
 * Gets keys that matches V of T
 */
type _TypeKeys<T, V> = {
    [K in keyof T]: IfEquals<T[K], V, K, never>
}[keyof T];
export type TypeKeys<T, V> = _TypeKeys<Required<T>, V>;
