import { IsDeepExcluded } from './helpers.js';
import { JsonKeys, OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> = _DeepPickOptional<Exclude<T, undefined>>;
type _DeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]?: DeepPickOptional<T[P]> };

/**
 * Pick all optional properties in T deeply including arrays
 */
export type HighDeepPickOptional<T> = _HighDeepPickOptional<Exclude<T, undefined>>;
type _HighDeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends (infer U)[] ? HighDeepPickOptional<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]?: HighDeepPickOptional<T[P]> };


/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = _DeepPickRequired<Exclude<T, undefined>>;
type _DeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in J]-?: DeepPickRequired<T[P]> };


/**
 * Pick all required properties in T deeply including arrays
 */
export type HighDeepPickRequired<T> = _HighDeepPickRequired<Exclude<T, undefined>>;
type _HighDeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends (infer U)[] ? HighDeepPickRequired<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in J]-?: HighDeepPickRequired<T[P]> };


/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> = _DeepPickReadonly<Exclude<T, undefined>>;
type _DeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]: DeepPickReadonly<T[P]> };

/**
 * Pick all readonly properties in T deeply including arrays
 */
export type HighDeepPickReadonly<T> = _HighDeepPickReadonly<Exclude<T, undefined>>;
type _HighDeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    T extends (infer U)[] ? HighDeepPickReadonly<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]: HighDeepPickReadonly<T[P]> };


/**
 * Pick all writable properties in T deeply
 */
export type DeepPickWritable<T> = _DeepPickWritable<Exclude<T, undefined>>;
type _DeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]: DeepPickWritable<T[P]> };

/**
 * Pick all writable properties in T deeply including arrays
 */
export type HighDeepPickWritable<T> = _HighDeepPickWritable<Exclude<T, undefined>>;
type _HighDeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends (infer U)[] ? HighDeepPickWritable<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]: HighDeepPickWritable<T[P]> };


/**
 * Pick all JSON friendly properties in T deeply
 */
export type DeepPickJson<T> = _DeepPickJson<Exclude<T, undefined>>;
type _DeepPickJson<T, Keys extends keyof T = JsonKeys<T>> =
    T extends (infer U)[] ? DeepPickJson<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in Keys]: DeepPickJson<T[P]> };
