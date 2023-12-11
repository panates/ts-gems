import { IfNoDeepValue } from './helpers.js';
import { OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';
import { OmitNever } from './omit.js';

/**
 * Omit all optional properties in T deeply
 */
export type DeepOmitOptional<T> = _DeepOmitOptional<Exclude<T, undefined>>;
type _DeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    IfNoDeepValue<T> extends true ? T
        : OmitNever<{ [P in K]-?: DeepOmitOptional<T[P]> }>;

/**
 * Omit all optional properties in T deeply including arrays
 */
export type HighDeepOmitOptional<T> = _HighDeepOmitOptional<Exclude<T, undefined>>;
type _HighDeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    T extends (infer U)[] ? HighDeepOmitOptional<U>[]
        : IfNoDeepValue<T> extends true ? T
            : OmitNever<{ [P in K]-?: HighDeepOmitOptional<T[P]> }>;


/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = _DeepOmitRequired<Exclude<T, undefined>>;
type _DeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    IfNoDeepValue<T> extends true ? T
        : OmitNever<{ [P in J]?: DeepOmitRequired<Exclude<T[P], undefined>> }>;


/**
 * Omit all required properties in T deeply including arrays
 */
export type HighDeepOmitRequired<T> = _HighDeepOmitRequired<Exclude<T, undefined>>;
type _HighDeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    T extends (infer U)[] ? HighDeepOmitRequired<U>[]
        : IfNoDeepValue<T> extends true ? T
            : OmitNever<{ [P in J]?: HighDeepOmitRequired<Exclude<T[P], undefined>> }>;


/**
 * Omit all readonly properties in T deeply
 */
export type DeepOmitReadonly<T> = _DeepOmitReadonly<Exclude<T, undefined>>;
type _DeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    IfNoDeepValue<T> extends true ? T
        : OmitNever<{ [P in J]: DeepOmitReadonly<T[P]> }>;


/**
 * Omit all readonly properties in T deeply including arrays
 */
export type HighDeepOmitReadonly<T> = _HighDeepOmitReadonly<Exclude<T, undefined>>;
type _HighDeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    T extends (infer U)[] ? HighDeepOmitReadonly<U>[]
        : IfNoDeepValue<T> extends true ? T
            : OmitNever<{ [P in J]: HighDeepOmitReadonly<T[P]> }>;


/**
 * Omit all writable properties in T deeply
 */
export type DeepOmitWritable<T> = _DeepOmitWritable<Exclude<T, undefined>>
type _DeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    IfNoDeepValue<T> extends true ? T
        : OmitNever<{ readonly [P in K]: DeepOmitWritable<T[P]> }>


/**
 * Omit all writable properties in T deeply including arrays
 */
export type HighDeepOmitWritable<T> = _HighDeepOmitWritable<Exclude<T, undefined>>
type _HighDeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    T extends (infer U)[] ? HighDeepOmitWritable<U>[]
        : IfNoDeepValue<T> extends true ? T
            : OmitNever<{ readonly [P in K]: HighDeepOmitWritable<T[P]> }>

/**
 * Omit all "never" and "undefined" properties in T deeply
 */
export type DeepOmitNever<T> = _DeepOmitNever<Exclude<T, undefined>>
type _DeepOmitNever<T> =
    IfNoDeepValue<T> extends true ? T
        : { [P in keyof T as (Exclude<T[P], undefined> extends never ? never : P)]: DeepOmitNever<T[P]> }


/**
 * Omit all "never" and "undefined" properties in T deeply including arrays
 */
export type HighDeepOmitNever<T> = _HighDeepOmitNever<Exclude<T, undefined>>
type _HighDeepOmitNever<T> =
    T extends (infer U)[] ? HighDeepOmitNever<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T as (Exclude<T[P], undefined> extends never ? never : P)]: HighDeepOmitNever<T[P]> }
