import { DeepOmitNever, HighDeepOmitNever } from './deep-omit.js';
import { IfNoDeepValue } from './helpers.js';

/**
 * Make all properties in T required deeply
 */
export type DeepRequired<T> = DeepOmitNever<_DeepRequired<T>>;
type _DeepRequired<T> =
    IfNoDeepValue<T> extends true ? T
        : { [P in keyof T]-?: _DeepRequired<Exclude<T[P], undefined>> };


/**
 * Make all properties in T required deeply including arrays
 */
export type HighDeepRequired<T> = HighDeepOmitNever<_HighDeepRequired<T>>;
type _HighDeepRequired<T> =
    T extends (infer U)[] ? _HighDeepRequired<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T]-?: _HighDeepRequired<Exclude<T[P], undefined>> };
