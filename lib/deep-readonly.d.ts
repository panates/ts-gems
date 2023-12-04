import { IsDeepExcluded } from './helpers.js';

/**
 * Make all properties in T readonly deeply
 */
export type DeepReadonly<T> = _DeepReadonly<T>;
type _DeepReadonly<T> =
    IsDeepExcluded<T> extends true ? T
        : { readonly [P in keyof T]: _DeepReadonly<Exclude<T[P], undefined>> };

/**
 * Make all properties in T readonly deeply
 */
export type HighDeepReadonly<T> = _HighDeepReadonly<T>;
type _HighDeepReadonly<T> =
    T extends (infer U)[] ? _HighDeepReadonly<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { readonly [P in keyof T]: _HighDeepReadonly<Exclude<T[P], undefined>> };

