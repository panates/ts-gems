import { IfNoDeepValue } from './helpers.js';
import { OmitNever } from './omit.js';

/**
 * Remove null from properties deeply
 */
export type DeepRemoveNulls<T> = _DeepRemoveNulls<T>;
type _DeepRemoveNulls<T> =
    IfNoDeepValue<T> extends true ? T
        : OmitNever<{ [P in keyof T]: _DeepRemoveNulls<Exclude<T[P], null>> }>;


/**
 * Remove null from properties deeply including arrays
 */
export type HighDeepRemoveNulls<T> = _HighDeepRemoveNulls<T>;
type _HighDeepRemoveNulls<T> =
    T extends (infer U)[] ? _HighDeepRemoveNulls<U>[]
        : IfNoDeepValue<T> extends true ? T
            : OmitNever<{ [P in keyof T]: _HighDeepRemoveNulls<Exclude<T[P], null>> }>;
