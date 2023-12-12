import { IfNoDeepValue } from './helpers';
import { OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Omit all optional properties in T deeply
 */
export type DeepOmitOptional<T> = DeepOmitNever<_DeepOmitOptional<T>>;
type _DeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]-?: _DeepOmitOptional<Exclude<T[P], undefined>> };

/**
 * Omit all optional properties in T deeply including arrays
 */
export type HighDeepOmitOptional<T> = HighDeepOmitNever<_HighDeepOmitOptional<T>>;
type _HighDeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitOptional<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]-?: _HighDeepOmitOptional<Exclude<T[P], undefined>> };


/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = DeepOmitNever<_DeepOmitRequired<T>>;
type _DeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in J]?: _DeepOmitRequired<Exclude<T[P], undefined>> };


/**
 * Omit all required properties in T deeply including arrays
 */
export type HighDeepOmitRequired<T> = HighDeepOmitNever<_HighDeepOmitRequired<T>>;
type _HighDeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitRequired<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in J]?: _HighDeepOmitRequired<Exclude<T[P], undefined>> };


/**
 * Omit all readonly properties in T deeply
 */
export type DeepOmitReadonly<T> = DeepOmitNever<_DeepOmitReadonly<Exclude<T, undefined>>>;
type _DeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in J]: _DeepOmitReadonly<Exclude<T[P], undefined>> };


/**
 * Omit all readonly properties in T deeply including arrays
 */
export type HighDeepOmitReadonly<T> = HighDeepOmitNever<_HighDeepOmitReadonly<T>>;
type _HighDeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitReadonly<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in J]: _HighDeepOmitReadonly<Exclude<T[P], undefined>> };


/**
 * Omit all writable properties in T deeply
 */
export type DeepOmitWritable<T> = DeepOmitNever<_DeepOmitWritable<T>>
type _DeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { readonly [P in K]: _DeepOmitWritable<Exclude<T[P], undefined>> }


/**
 * Omit all writable properties in T deeply including arrays
 */
export type HighDeepOmitWritable<T> = HighDeepOmitNever<_HighDeepOmitWritable<T>>
type _HighDeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitWritable<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { readonly [P in K]: _HighDeepOmitWritable<Exclude<T[P], undefined>> }

/**
 * Omit all "never" and "undefined" properties in T deeply
 */
export type DeepOmitNever<T> = _DeepOmitNever<T>
type _DeepOmitNever<T> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T as (Exclude<T[P], undefined> extends never ? never : P)]: _DeepOmitNever<Exclude<T[P], undefined>> }


/**
 * Omit all "never" and "undefined" properties in T deeply including arrays
 */
export type HighDeepOmitNever<T> = _HighDeepOmitNever<T>
type _HighDeepOmitNever<T> =
    T extends (infer U)[] ? _HighDeepOmitNever<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T as (Exclude<T[P], undefined> extends never ? never : P)]: _HighDeepOmitNever<Exclude<T[P], undefined>> }
