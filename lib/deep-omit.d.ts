import { IsDeepExcluded } from './helpers.js';
import { OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Omit all optional properties in T deeply
 */
export type DeepOmitOptional<T> = _DeepOmitOptional<T>;
type _DeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]: _DeepOmitOptional<Exclude<T[P], undefined>> };

/**
 * Omit all optional properties in T deeply including arrays
 */
export type HighDeepOmitOptional<T> = _HighDeepOmitOptional<T>;
type _HighDeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitOptional<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]: _HighDeepOmitOptional<Exclude<T[P], undefined>> };


/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = _DeepOmitRequired<T>;
type _DeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in J]: _DeepOmitRequired<Exclude<T[P], undefined>> };


/**
 * Omit all required properties in T deeply including arrays
 */
export type HighDeepOmitRequired<T> = _HighDeepOmitRequired<T>;
type _HighDeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitRequired<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in J]: _HighDeepOmitRequired<Exclude<T[P], undefined>> };


/**
 * Omit all readonly properties in T deeply
 */
export type DeepOmitReadonly<T> = _DeepOmitReadonly<T>;
type _DeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in J]: _DeepOmitReadonly<Exclude<T[P], undefined>> };


/**
 * Omit all readonly properties in T deeply including arrays
 */
export type HighDeepOmitReadonly<T> = _HighDeepOmitReadonly<T>;
type _HighDeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitReadonly<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in J]: _HighDeepOmitReadonly<Exclude<T[P], undefined>> };


/**
 * Omit all writable properties in T deeply
 */
export type DeepOmitWritable<T> = _DeepOmitWritable<T>
type _DeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    IsDeepExcluded<T> extends true ? T
        : { [P in K]: _DeepOmitWritable<Exclude<T[P], undefined>> }


/**
 * Omit all writable properties in T deeply including arrays
 */
export type HighDeepOmitWritable<T> = _HighDeepOmitWritable<T>
type _HighDeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    T extends (infer U)[] ? _HighDeepOmitWritable<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in K]: _HighDeepOmitWritable<Exclude<T[P], undefined>> }
