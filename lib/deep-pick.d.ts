import {Builtin} from './common';
import {IfTuple} from './type-check';
import {JsonKeys, OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys} from './keys';

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> = _DeepPickOptional<T>;
type _DeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPickOptional<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPickOptional<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickOptional<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickOptional<V>>
                        : T extends Set<infer U> ? Set<DeepPickOptional<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickOptional<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPickOptional<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPickOptional<T[K]> }
                                        : T extends (infer U)[] ? DeepPickOptional<U>[]
                                            : { [P in K]: DeepPickOptional<Exclude<T[P], undefined>> };

/**
 * Pick all required properties in T deeply
 */
export type DeepPickRequired<T> = _DeepPickRequired<T>;
type _DeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPickRequired<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPickRequired<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickRequired<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickRequired<V>>
                        : T extends Set<infer U> ? Set<DeepPickRequired<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickRequired<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPickRequired<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPickRequired<T[K]> }
                                        : T extends (infer U)[] ? DeepPickRequired<U>[]
                                            : { [P in J]: DeepPickRequired<Exclude<T[P], undefined>> };

/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> = _DeepPickReadonly<T>;
type _DeepPickReadonly<T, J extends keyof T = ReadonlyKeys<T>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPickReadonly<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPickReadonly<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickReadonly<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickReadonly<V>>
                        : T extends Set<infer U> ? Set<DeepPickReadonly<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickReadonly<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPickReadonly<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPickReadonly<T[K]> }
                                        : T extends (infer U)[] ? DeepPickReadonly<U>[]
                                            : { [P in J]: DeepPickReadonly<Exclude<T[P], undefined>> };

/**
 * Pick all writable properties in T deeply
 */
export type DeepPickWritable<T> = _DeepPickWritable<T>
type _DeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPickWritable<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPickWritable<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickWritable<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickWritable<V>>
                        : T extends Set<infer U> ? Set<DeepPickWritable<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickWritable<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPickWritable<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPickWritable<T[K]> }
                                        : T extends (infer U)[] ? DeepPickWritable<U>[]
                                            : { [P in K]: DeepPickWritable<Exclude<T[P], undefined>> }

/**
 * Pick all JSON friendly properties in T deeply
 */
export type DeepPickJson<T> = _DeepPickJson<T>
type _DeepPickJson<T, Keys extends keyof T = JsonKeys<T>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPickJson<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPickJson<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickJson<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickJson<V>>
                        : T extends Set<infer U> ? Set<DeepPickJson<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickJson<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPickJson<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPickJson<T[K]> }
                                        : T extends (infer U)[] ? DeepPickJson<U>[]
                                            : { [P in Keys]: DeepPickJson<Exclude<T[P], undefined>> };


/**
 * Pick all JSON friendly properties in T deeply
 */
export type DeepPickWritableJson<T> = _DeepPickWritableJson<T>
type _DeepPickWritableJson<T, Keys extends keyof T = Exclude<JsonKeys<T>, ReadonlyKeys<T>>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepPickWritableJson<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepPickWritableJson<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickWritableJson<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickWritableJson<V>>
                        : T extends Set<infer U> ? Set<DeepPickWritableJson<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickWritableJson<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepPickWritableJson<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepPickWritableJson<T[K]> }
                                        : T extends (infer U)[] ? DeepPickWritableJson<U>[]
                                            : { [P in Keys]: DeepPickWritableJson<Exclude<T[P], undefined>> };
