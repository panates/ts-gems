import { DeepOmitNever, HighDeepOmitNever } from './deep-omit';
import { IfNoDeepValue } from './helpers';

/**
 * Remove null from properties deeply
 */
export type DeepRemoveNulls<T> = DeepOmitNever<_DeepRemoveNulls<T>>;
type _DeepRemoveNulls<T> =
    T extends any[] ? T
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T]: _DeepRemoveNulls<Exclude<T[P], null>> };


/**
 * Remove null from properties deeply including arrays
 */
export type HighDeepRemoveNulls<T> = HighDeepOmitNever<_HighDeepRemoveNulls<T>>;
type _HighDeepRemoveNulls<T> =
    T extends (infer U)[] ? _HighDeepRemoveNulls<U>[]
        : IfNoDeepValue<T> extends true ? T
            : { [P in keyof T]: _HighDeepRemoveNulls<Exclude<T[P], null>> };
