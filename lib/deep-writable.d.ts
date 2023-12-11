import { DeepOmitNever, HighDeepOmitNever } from './deep-omit.js';
import { IfNoDeepValue } from './helpers.js';

/**
 * Make all properties in T writable deeply
 */
export type DeepWritable<T> = DeepOmitNever<_DeepWritable<T>>;
type _DeepWritable<T> =
    IfNoDeepValue<T> extends true ? T
        : { -readonly [P in keyof T]: _DeepWritable<T[P]> };


/**
 * Make all properties in T writable deeply including arrays
 */
export type HighDeepWritable<T> = HighDeepOmitNever<_HighDeepWritable<T>>;
type _HighDeepWritable<T> =
    T extends (infer U)[] ? _HighDeepWritable<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { -readonly [P in keyof T]: _HighDeepWritable<T[P]> };
