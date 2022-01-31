import {Builtin} from './common';
import {IfTuple} from './type-check';
import {OptionalKeys} from './keys';

/**
 * Partial but deeply
 */
export type DeepPartial<T> = _DeepPartial<T>;
type _DeepPartial<T> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPartial<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPartial<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPartial<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPartial<V>>
                        : T extends Set<infer U> ? Set<DeepPartial<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPartial<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPartial<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPartial<T[K]> }
                                        : T extends (infer U)[] ? DeepPartial<U>[]
                                            : { [P in keyof T]?: DeepPartial<Exclude<T[P], undefined>> };

/**
 * Combination of Partial and Writable but deeply
 */
export type DeepBuildable<T> = _DeepBuildable<T>;
type _DeepBuildable<T> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepBuildable<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepBuildable<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepBuildable<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepBuildable<V>>
                        : T extends Set<infer U> ? Set<DeepBuildable<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepBuildable<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepBuildable<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepBuildable<T[K]> }
                                        : T extends (infer U)[] ? DeepBuildable<U>[]
                                            : { -readonly [P in keyof T]?: DeepBuildable<Exclude<T[P], undefined>> };

/**
 * Make all properties in T required deeply
 */
export type DeepRequired<T> = _DeepRequired<T>;
type _DeepRequired<T> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepRequired<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepRequired<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepRequired<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepRequired<V>>
                        : T extends Set<infer U> ? Set<DeepRequired<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepRequired<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepRequired<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepRequired<T[K]> }
                                        : T extends (infer U)[] ? DeepRequired<U>[]
                                            : { [P in keyof T]-?: DeepRequired<Exclude<T[P], undefined>> };


/**
 * Make all properties in T readonly deeply
 */
export type DeepReadonly<T> = _DeepReadonly<T>;
type _DeepReadonly<T> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepReadonly<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepReadonly<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepReadonly<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepReadonly<V>>
                        : T extends Set<infer U> ? Set<DeepReadonly<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepReadonly<T[K]> }
                                        : T extends (infer U)[] ? DeepReadonly<U>[]
                                            : { readonly [P in keyof T]: DeepReadonly<Exclude<T[P], undefined>> };

/**
 * Make all properties in T writable deeply
 */
export type DeepWritable<T> = _DeepWritable<T>;
type _DeepWritable<T> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepWritable<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepWritable<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepWritable<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepWritable<V>>
                        : T extends Set<infer U> ? Set<DeepWritable<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepWritable<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepWritable<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepWritable<T[K]> }
                                        : T extends (infer U)[] ? DeepWritable<U>[]
                                            : { -readonly [P in keyof T]: DeepWritable<Exclude<T[P], undefined>> };

/**
 * Make all properties in T nullable deeply
 */
export type DeepNullish<T> = _DeepNullish<DeepRequired<T>>;
type _DeepNullish<T> =
    T extends Builtin ? T | null | undefined
        : T extends Promise<infer U> ? Promise<DeepNullish<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepNullish<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepNullish<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepNullish<V>>
                        : T extends Set<infer U> ? Set<DeepNullish<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNullish<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepNullish<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepNullish<T[K]> }
                                        : T extends (infer U)[] ? DeepNullish<U>[] | null | undefined
                                            : { [P in keyof T]: DeepNullish<T[P]>| null | undefined };
