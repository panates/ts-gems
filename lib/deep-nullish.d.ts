import { DeepRequired, HighDeepRequired } from './deep-required.js';
import { IfNoDeepValue } from './helpers.js';

/**
 * Make all properties in T nullable deeply
 */
export type DeepNullish<T> = _DeepNullish<DeepRequired<T>>;
type _DeepNullish<T> =
    IfNoDeepValue<T> extends true ? T
        : { [P in keyof T]?: _DeepNullish<Exclude<T[P], undefined>> | null };


/**
 * Make all properties in T nullable deeply including arrays
 */
export type HighDeepNullish<T> = _HighDeepNullish<HighDeepRequired<T>>;
type _HighDeepNullish<T> =
    T extends (infer U)[] ? _HighDeepNullish<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T]?: _HighDeepNullish<Exclude<T[P], undefined>> | null };

