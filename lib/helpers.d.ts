import { Builtin } from './common.js';
import { IfClass, IfTuple } from './type-check.js';

/**
 * Returns true if T is excluded from deep operations
 */
export type IsDeepExcluded<T> = _IsHighDeepObject<T>;
type _IsHighDeepObject<T> =
    T extends Builtin ? true
        : IfTuple<T> extends true ? true
            : IfClass<T> extends true ? true
                : T extends Map<any, any> ? true
                    : T extends ReadonlyMap<any, any> ? true
                        : T extends WeakMap<any, any> ? true
                            : T extends Set<any> ? true
                                : T extends ReadonlySet<any> ? true
                                    : T extends WeakSet<any> ? true
                                        : T extends any[] ? true
                                            : false;
