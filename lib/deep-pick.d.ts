import { IsDeepExcluded } from './helpers.js';
import { JsonKeys, OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> = _DeepPickOptional<T>;
type _DeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]?: _DeepPickOptional<Exclude<T[P], undefined>> };

/**
 * Pick all optional properties in T deeply including arrays
 */
export type HighDeepPickOptional<T> = _HighDeepPickOptional<T>;
type _HighDeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickOptional<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]?: _HighDeepPickOptional<Exclude<T[P], undefined>> };


/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = _DeepPickRequired<T>;
type _DeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in J]-?: DeepPickRequired<Exclude<T[P], undefined>> };


/**
 * Pick all required properties in T deeply including arrays
 */
export type HighDeepPickRequired<T> = _HighDeepPickRequired<T>;
type _HighDeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickRequired<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in J]-?: _HighDeepPickRequired<Exclude<T[P], undefined>> };


/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> = _DeepPickReadonly<T>;
type _DeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]: DeepPickReadonly<Exclude<T[P], undefined>> };

/**
 * Pick all readonly properties in T deeply including arrays
 */
export type HighDeepPickReadonly<T> = _HighDeepPickReadonly<T>;
type _HighDeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickReadonly<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]: _HighDeepPickReadonly<Exclude<T[P], undefined>> };


/**
 * Pick all writable properties in T deeply
 */
export type DeepPickWritable<T> = _DeepPickWritable<T>;
type _DeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]: DeepPickWritable<Exclude<T[P], undefined>> };

/**
 * Pick all writable properties in T deeply including arrays
 */
export type HighDeepPickWritable<T> = _HighDeepPickWritable<T>;
type _HighDeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends (infer U)[] ? _HighDeepPickWritable<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]: _HighDeepPickWritable<Exclude<T[P], undefined>> };


/**
 * Pick all JSON friendly properties in T deeply
 */
export type DeepPickJson<T> = _DeepPickJson<T>
type _DeepPickJson<T, Keys extends keyof T = JsonKeys<T>> =
    T extends (infer U)[] ? _DeepPickJson<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in Keys]: DeepPickJson<Exclude<T[P], undefined>> };
