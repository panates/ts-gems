import { IsDeepExcluded } from './helpers.js';

/**
 * Partial but deeply
 */
export type DeepPartial<T> = _DeepPartial<T>;
type _DeepPartial<T> =
    IsDeepExcluded<T> extends true ? T
        : { [P in keyof T]?: _DeepPartial<Exclude<T[P], undefined>> };

/**
 * Partial but deeply including arrays
 */
export type HighDeepPartial<T> = _HighDeepPartial<T>;
type _HighDeepPartial<T> =
    T extends (infer U)[] ? _HighDeepPartial<U>[]
        : IsDeepExcluded<T> extends true ? T
            : { [P in keyof T]?: _HighDeepPartial<Exclude<T[P], undefined>> };
