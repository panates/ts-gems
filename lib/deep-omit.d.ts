import { Builtin } from './common';
import { IfTuple } from './type-check';
import { JsonKeys, OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Omit all optional properties in T deeply
 */
export type DeepOmitOptional<T> = _DeepOmitOptional<T>;
type _DeepOmitOptional<T, K extends keyof T = Exclude<keyof T, OptionalKeys<T>>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepOmitOptional<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepOmitOptional<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitOptional<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitOptional<V>>
                        : T extends Set<infer U> ? Set<DeepOmitOptional<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitOptional<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepOmitOptional<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepOmitOptional<T[K]> }
                                        : T extends (infer U)[] ? DeepOmitOptional<U>[]
                                            : { [P in K]: DeepOmitOptional<Exclude<T[P], undefined>> };

/**
 * Omit all required properties in T deeply
 */
export type DeepOmitRequired<T> = _DeepOmitRequired<T>;
type _DeepOmitRequired<T, J extends keyof T = Exclude<keyof T, RequiredKeys<T>>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepOmitRequired<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepOmitRequired<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitRequired<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitRequired<V>>
                        : T extends Set<infer U> ? Set<DeepOmitRequired<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitRequired<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepOmitRequired<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepOmitRequired<T[K]> }
                                        : T extends (infer U)[] ? DeepOmitRequired<U>[]
                                            : { [P in J]: DeepOmitRequired<Exclude<T[P], undefined>> };

/**
 * Omit all readonly properties in T deeply
 */
export type DeepOmitReadonly<T> = _DeepOmitReadonly<T>;
type _DeepOmitReadonly<T, J extends keyof T = Exclude<keyof T, ReadonlyKeys<T>>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepOmitReadonly<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepOmitReadonly<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitReadonly<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitReadonly<V>>
                        : T extends Set<infer U> ? Set<DeepOmitReadonly<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitReadonly<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepOmitReadonly<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepOmitReadonly<T[K]> }
                                        : T extends (infer U)[] ? DeepOmitReadonly<U>[]
                                            : { [P in J]: DeepOmitReadonly<Exclude<T[P], undefined>> };

/**
 * Omit all writable properties in T deeply
 */
export type DeepOmitWritable<T> = _DeepOmitWritable<T>
type _DeepOmitWritable<T, K extends keyof T = Exclude<keyof T, WritableKeys<T>>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepOmitWritable<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepOmitWritable<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitWritable<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitWritable<V>>
                        : T extends Set<infer U> ? Set<DeepOmitWritable<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitWritable<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepOmitWritable<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepOmitWritable<T[K]> }
                                        : T extends (infer U)[] ? DeepOmitWritable<U>[]
                                            : { [P in K]: DeepOmitWritable<Exclude<T[P], undefined>> }

/**
 * Omit all JSON friendly properties in T deeply
 */
export type DeepOmitJson<T> = _DeepOmitJson<T>
type _DeepOmitJson<T, K extends keyof T = Exclude<keyof T, JsonKeys<T>>> =
    T extends Builtin ? T
        : T extends Promise<infer U> ? Promise<DeepOmitJson<U>>
            : T extends Map<infer K, infer V> ? Map<K, DeepOmitJson<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepOmitJson<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepOmitJson<V>>
                        : T extends Set<infer U> ? Set<DeepOmitJson<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<DeepOmitJson<U>>
                                : T extends WeakSet<infer U> ? WeakSet<DeepOmitJson<U>>
                                    : IfTuple<T> extends true ? { [K in OptionalKeys<T>]?: DeepOmitJson<T[K]> }
                                        : T extends (infer U)[] ? DeepOmitJson<U>[]
                                            : { [P in K]: DeepOmitJson<Exclude<T[P], undefined>> };
