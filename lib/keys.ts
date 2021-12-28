import {IfEquals, IfCompatible, IfUndefined, IfAny, IfJson} from './type-check';

/**
 * KeyOf
 * @desc Returns the union type of all the keys in a type
 */
export type KeysOf<T> = keyof T;

/**
 * ValuesOf
 * @desc Returns the union type of all the values in a type
 */
export type ValuesOf<T> = T[keyof T];


/**
 * OptionalKeys
 * @desc Returns optional keys of an object
 */
export type OptionalKeys<T> = ValuesOf<{
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}>;

/**
 * RequiredKeys
 * @desc Returns required keys of an object
 */
export type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;

/**
 * @desc Returns readonly keys of an object
 */
export type ReadonlyKeys<T> = ValuesOf<{
    [K in keyof T]-?: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, never, K>
}>;

/**
 * @desc Returns non function keys of an object
 */
export type NonFunctionKeys<T> = Exclude<keyof T, FunctionKeys<T>>;


/**
 * @desc Returns non function keys of an object
 */
export type JsonKeys<T> = ValuesOf<{
    [K in keyof T]-?: IfUndefined<T[K]> extends false ?
        K extends symbol ? never :
            IfJson<T[K]> extends true ?
                K : never : never;
}>;

/**
 * @desc Returns writable keys of an object
 */
export type WritableKeys<T> = Exclude<keyof T, ReadonlyKeys<T>>;


/**
 * @desc Returns writable json keys of an object
 */
export type WritableJsonKeys<T> = Extract<{
    [K in keyof T]-?: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, K, never>
}[keyof T], JsonKeys<T>>;

/**
 * @desc Returns Function keys of an object
 */
export type FunctionKeys<T> = ValuesOf<{
    [K in keyof T]-?: IfUndefined<T[K]> extends false ?
        IfAny<T[K]> extends false ?
            T[K] extends Function ? K
                : never : never : never;
}>;

/**
 * @desc Returns keys that match given type
 */
export type KeysCompatible<T, U> = ValuesOf<{
    [K in keyof T]-?: IfCompatible<T[K], U, K, never>;
}>;

/**
 * @desc Returns keys that equals given type
 */
export type KeysEquals<T, U> = ValuesOf<{
    [K in keyof T]-?: IfEquals<T[K], U, K, never>;
}>;

