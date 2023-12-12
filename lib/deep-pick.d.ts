import { DeepOmitNever, HighDeepOmitNever } from './deep-omit';
import { IfNoDeepValue } from './helpers';
import { JsonKeys, OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> = DeepOmitNever<_DeepPickOptional<T>>;
type _DeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]?: _DeepPickOptional<Exclude<T[P], undefined>> };

/**
 * Pick all optional properties in T deeply including arrays
 */
export type HighDeepPickOptional<T> = HighDeepOmitNever<_HighDeepPickOptional<T>>;
type _HighDeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickOptional<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]?: _HighDeepPickOptional<Exclude<T[P], undefined>> };


/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = DeepOmitNever<_DeepPickRequired<T>>;
type _DeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in J]-?: _DeepPickRequired<Exclude<T[P], undefined>> };


/**
 * Pick all required properties in T deeply including arrays
 */
export type HighDeepPickRequired<T> = HighDeepOmitNever<_HighDeepPickRequired<T>>;
type _HighDeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickRequired<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in J]-?: _HighDeepPickRequired<Exclude<T[P], undefined>> };


/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> = DeepOmitNever<_DeepPickReadonly<T>>;
type _DeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]: _DeepPickReadonly<Exclude<T[P], undefined>> };

/**
 * Pick all readonly properties in T deeply including arrays
 */
export type HighDeepPickReadonly<T> = HighDeepOmitNever<_HighDeepPickReadonly<T>>;
type _HighDeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickReadonly<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]: _HighDeepPickReadonly<Exclude<T[P], undefined>> };


/**
 * Pick all writable properties in T deeply
 */
export type DeepPickWritable<T> = DeepOmitNever<_DeepPickWritable<T>>;
type _DeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]: _DeepPickWritable<Exclude<T[P], undefined>> };

/**
 * Pick all writable properties in T deeply including arrays
 */
export type HighDeepPickWritable<T> = HighDeepOmitNever<_HighDeepPickWritable<T>>;
type _HighDeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickWritable<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in K]: _HighDeepPickWritable<Exclude<T[P], undefined>> };


/**
 * Pick all JSON friendly properties in T deeply
 */
export type DeepPickJson<T> = DeepOmitNever<_DeepPickJson<T>>;
type _DeepPickJson<T, Keys extends keyof T = JsonKeys<T>> =
    T extends (infer U)[] ? _DeepPickJson<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in Keys]: _DeepPickJson<Exclude<T[P], undefined>> };
