import { IfNoDeepValue } from './helpers.js';
import { OmitNever } from './omit.js';

/**
 * Make all properties in T writable deeply
 */
export type DeepWritable<T> = _DeepWritable<T>;
type _DeepWritable<T> =
    IfNoDeepValue<T> extends true ? T
        : OmitNever<{ -readonly [P in keyof T]: _DeepWritable<T[P]> }>;


/**
 * Make all properties in T writable deeply including arrays
 */
export type HighDeepWritable<T> = _HighDeepWritable<T>;
type _HighDeepWritable<T> =
    T extends (infer U)[] ? _HighDeepWritable<U>[]
        : IfNoDeepValue<T> extends true ? T
            : OmitNever<{ -readonly [P in keyof T]: _HighDeepWritable<T[P]> }>;
