/** Like Partial but recursive */
import {Builtin} from './common';
import {IsTuple} from './type-check';
import {OptionalKeys, ReadableKeys, ReadonlyKeys, RequiredKeys, TypeKeys, WritableKeys} from './keys';

/**
 * Pick all optional properties in object type
 */
export type PickOptional<T> = Pick<T, OptionalKeys<T>>;

/**
 * Pick all required properties in object type
 */
export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

/**
 * Pick all readonly properties in object type
 */
export type PickReadonly<T> = Pick<T, ReadonlyKeys<T>>;

/**
 * Pick all readable properties in object type
 */
export type PickReadable<T> = Pick<T, ReadableKeys<T>>;

/**
 * Pick all writable properties in object type
 */
export type PickWritable<T> = Pick<T, WritableKeys<T>>;

/**
 * Pick all properties of given type in object type
 */
export type PickType<T, S> = Pick<T, TypeKeys<T, S>>;

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepPickOptional<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickOptional<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickOptional<V>>
                    : T extends Set<infer U> ? Set<DeepPickOptional<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickOptional<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepPickOptional<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepPickOptional<T[K]> } : (DeepPickOptional<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepPickOptional<U>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepPickOptional<T[K]> }
                                            : PickOptional<T>;


/**
 * Pick all non optional properties in T deeply
 */
export type DeepPickRequired<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepPickRequired<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickRequired<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickRequired<V>>
                    : T extends Set<infer U> ? Set<DeepPickRequired<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickRequired<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepPickRequired<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepPickRequired<T[K]> } : (DeepPickRequired<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepPickRequired<U>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepPickRequired<T[K]> }
                                            : PickRequired<T>;

/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepPickReadonly<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickReadonly<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickReadonly<V>>
                    : T extends Set<infer U> ? Set<DeepPickReadonly<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickReadonly<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepPickReadonly<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepPickReadonly<T[K]> } : (DeepPickReadonly<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepPickReadonly<U>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepPickReadonly<T[K]> }
                                            : PickReadonly<T>;

/**
 * Pick all non readonly properties in T deeply
 */
export type DeepPickWritable<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepPickWritable<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickWritable<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickWritable<V>>
                    : T extends Set<infer U> ? Set<DeepPickWritable<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickWritable<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepPickWritable<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in WritableKeys<T>]?: DeepPickWritable<T[K]> } : (DeepPickWritable<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepPickWritable<U>>
                                        : T extends {} ? { [K in WritableKeys<T>]?: DeepPickWritable<T[K]> }
                                            : PickWritable<T>;

/**
 * Pick properties in given type in T deeply
 */
export type DeepPickType<T, S> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepPickType<V, S>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPickType<V, S>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPickType<V, S>>
                    : T extends Set<infer U> ? Set<DeepPickType<U, S>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPickType<U, S>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepPickType<U, S>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepPickType<T[K], S> } : (DeepPickType<U, S>)[]
                                    : T extends Promise<infer U> ? Promise<DeepPickType<U, S>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepPickType<T[K], S> }
                                            : PickType<T, S>;
