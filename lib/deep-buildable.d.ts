import { DeepOmitNever, HighDeepOmitNever } from './deep-omit.js';
import { IfNoDeepValue } from './helpers.js';

/**
 * Combination of Partial and Writable but deeply
 */
export type DeepBuildable<T> = DeepOmitNever<_DeepBuildable<T>>;
type _DeepBuildable<T> =
    IfNoDeepValue<T> extends true ? T
        : { -readonly [P in keyof T]?: _DeepBuildable<Exclude<T[P], undefined>> };

/**
 * Combination of Partial and Writable but deeply including arrays
 */
export type HighDeepBuildable<T> = HighDeepOmitNever<_HighDeepBuildable<T>>;
type _HighDeepBuildable<T> =
    T extends (infer U)[] ? _HighDeepBuildable<U>[]
        : IfNoDeepValue<T> extends true ? T
            : T extends (infer U)[] ? _HighDeepBuildable<U>[]
                : { -readonly [P in keyof T]?: _HighDeepBuildable<Exclude<T[P], undefined>> };
