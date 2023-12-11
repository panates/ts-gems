import { DeepOmitNever, HighDeepOmitNever } from './deep-omit.js';
import { IfNoDeepValue } from './helpers.js';

/**
 * Make all properties in T readonly deeply
 */
export type DeepReadonly<T> = DeepOmitNever<_DeepReadonly<T>>;
type _DeepReadonly<T> =
    IfNoDeepValue<T> extends true ? T
        : { readonly [P in keyof T]: _DeepReadonly<T[P]> };

/**
 * Make all properties in T readonly deeply
 */
export type HighDeepReadonly<T> = HighDeepOmitNever<_HighDeepReadonly<T>>;
type _HighDeepReadonly<T> =
    T extends (infer U)[] ? _HighDeepReadonly<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { readonly [P in keyof T]: _HighDeepReadonly<T[P]> };

