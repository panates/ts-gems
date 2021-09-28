/** Like Partial but recursive */
import {Builtin} from './common';
import {IsTuple} from './type-check';
import {OptionalKeys, ReadonlyKeys, RequiredKeys, TypeKeys, WritableKeys} from './keys';

/**
 * Omit all optional properties in object type
 */
export type OmitOptional<T> = Omit<T, OptionalKeys<T>>;

/**
 * Omit all required properties in object type
 */
export type OmitRequired<T> = Omit<T, RequiredKeys<T>>;

/**
 * Omit all readonly properties in object type
 */
export type OmitReadonly<T> = Omit<T, ReadonlyKeys<T>>;

/**
 * Omit all writable properties in object type
 */
export type OmitWritable<T> = Omit<T, WritableKeys<T>>;

/**
 * Omit all properties of given type in object type
 */
export type OmitType<T, S> = Omit<T, TypeKeys<T, S>>;


/**
 * Omit all optional properties in T deeply
 */
export type DeepOmitOptional<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepOmitOptional<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitOptional<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitOptional<V>>
                    : T extends Set<infer U> ? Set<DeepOmitOptional<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitOptional<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepOmitOptional<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepOmitOptional<T[K]> } : (DeepOmitOptional<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepOmitOptional<U>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepOmitOptional<T[K]> }
                                            : OmitOptional<T>;


/**
 * Omit all non optional properties in T deeply
 */
export type DeepOmitRequired<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepOmitRequired<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitRequired<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitRequired<V>>
                    : T extends Set<infer U> ? Set<DeepOmitRequired<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitRequired<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepOmitRequired<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepOmitRequired<T[K]> } : (DeepOmitRequired<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepOmitRequired<U>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepOmitRequired<T[K]> }
                                            : OmitRequired<T>;

/**
 * Omit all readonly properties in T deeply
 */
export type DeepOmitReadonly<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepOmitReadonly<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitReadonly<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitReadonly<V>>
                    : T extends Set<infer U> ? Set<DeepOmitReadonly<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitReadonly<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepOmitReadonly<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepOmitReadonly<T[K]> } : (DeepOmitReadonly<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepOmitReadonly<U>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepOmitReadonly<T[K]> }
                                            : OmitReadonly<T>;

/**
 * Omit all non readonly properties in T deeply
 */
export type DeepOmitWritable<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepOmitWritable<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitWritable<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitWritable<V>>
                    : T extends Set<infer U> ? Set<DeepOmitWritable<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitWritable<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepOmitWritable<U>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in WritableKeys<T>]?: DeepOmitWritable<T[K]> } : (DeepOmitWritable<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepOmitWritable<U>>
                                        : T extends {} ? { [K in WritableKeys<T>]?: DeepOmitWritable<T[K]> }
                                            : OmitWritable<T>;

/**
 * Omit properties in given type in T deeply
 */
export type DeepOmitType<T, S> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepOmitType<V, S>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitType<V, S>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitType<V, S>>
                    : T extends Set<infer U> ? Set<DeepOmitType<U, S>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitType<U, S>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepOmitType<U, S>>
                                : T extends (infer U)[] ? T extends IsTuple<T>
                                        ? { [K in ReadonlyKeys<T>]?: DeepOmitType<T[K], S> } : (DeepOmitType<U, S>)[]
                                    : T extends Promise<infer U> ? Promise<DeepOmitType<U, S>>
                                        : T extends {} ? { [K in ReadonlyKeys<T>]?: DeepOmitType<T[K], S> }
                                            : OmitType<T, S>;
