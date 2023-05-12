import { Builtin } from './common';
import { IfClass, IfTuple } from './type-check';
import { JsonKeys, OptionalKeys, ReadonlyKeys, RequiredKeys, WritableKeys } from './keys';

/**
 * Pick all optional properties in T deeply
 */
export type DeepPickOptional<T> = _DeepPickOptional<T>;
type _DeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<DeepPickOptional<U>>
                    : T extends Map<any, any> ? T
                        : T extends ReadonlyMap<any, any> ? T
                            : T extends WeakMap<any, any> ? T
                                : T extends Set<any> ? T
                                    : T extends ReadonlySet<any> ? T
                                        : T extends WeakSet<any> ? T
                                            : T extends any[] ? T
                                                : { [P in K]?: DeepPickOptional<Exclude<T[P], undefined>> };

/**
 * Pick all optional properties in T deeply
 */
export type StrictDeepPickOptional<T> = _StrictDeepPickOptional<T>;
type _StrictDeepPickOptional<T, K extends keyof T = OptionalKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<StrictDeepPickOptional<U>>
                    : T extends Map<infer K, infer V> ? Map<K, StrictDeepPickOptional<V>>
                        : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, StrictDeepPickOptional<V>>
                            : T extends WeakMap<infer K, infer V> ? WeakMap<K, StrictDeepPickOptional<V>>
                                : T extends Set<infer U> ? Set<StrictDeepPickOptional<U>>
                                    : T extends ReadonlySet<infer U> ? ReadonlySet<StrictDeepPickOptional<U>>
                                        : T extends WeakSet<infer U> ? WeakSet<StrictDeepPickOptional<U>>
                                            : T extends (infer U)[] ? StrictDeepPickOptional<U>[]
                                                : { [P in K]?: StrictDeepPickOptional<Exclude<T[P], undefined>> };

/**
 * Pick all required properties in T deeply even in Maps, Sets etc
 */
export type DeepPickRequired<T> = _DeepPickRequired<T>;
type _DeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<DeepPickRequired<U>>
                    : T extends Map<any, any> ? T
                        : T extends ReadonlyMap<any, any> ? T
                            : T extends WeakMap<any, any> ? T
                                : T extends Set<any> ? T
                                    : T extends ReadonlySet<any> ? T
                                        : T extends WeakSet<any> ? T
                                            : T extends any[] ? T
                                                : { [P in J]-?: DeepPickRequired<Exclude<T[P], undefined>> };

/**
 * Pick all required properties in T deeply even in Maps, Sets etc
 */
export type StrictDeepPickRequired<T> = _StrictDeepPickRequired<T>;
type _StrictDeepPickRequired<T, J extends keyof T = RequiredKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<StrictDeepPickRequired<U>>
                    : T extends Map<infer K, infer V> ? Map<K, StrictDeepPickRequired<V>>
                        : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, StrictDeepPickRequired<V>>
                            : T extends WeakMap<infer K, infer V> ? WeakMap<K, StrictDeepPickRequired<V>>
                                : T extends Set<infer U> ? Set<StrictDeepPickRequired<U>>
                                    : T extends ReadonlySet<infer U> ? ReadonlySet<StrictDeepPickRequired<U>>
                                        : T extends WeakSet<infer U> ? WeakSet<StrictDeepPickRequired<U>>
                                            : T extends (infer U)[] ? StrictDeepPickRequired<U>[]
                                                : { [P in J]-?: StrictDeepPickRequired<Exclude<T[P], undefined>> };


/**
 * Pick all readonly properties in T deeply
 */
export type DeepPickReadonly<T> = _DeepPickReadonly<T>;
type _DeepPickReadonly<T, K extends keyof T = ReadonlyKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<DeepPickReadonly<U>>
                    : T extends Map<any, any> ? T
                        : T extends ReadonlyMap<any, any> ? T
                            : T extends WeakMap<any, any> ? T
                                : T extends Set<any> ? T
                                    : T extends ReadonlySet<any> ? T
                                        : T extends WeakSet<any> ? T
                                            : T extends any[] ? T
                                                : { [P in K]: DeepPickReadonly<Exclude<T[P], undefined>> };

/**
 * Pick all readonly properties in T deeply even in Maps, Sets etc
 */
export type StrictDeepPickReadonly<T> = _StrictDeepPickReadonly<T>;
type _StrictDeepPickReadonly<T, J extends keyof T = ReadonlyKeys<T>> =
    T extends Builtin ? T
        // : IfTuple<T> extends true ? T
        // : IfClass<T> extends true ? T
        : T extends Promise<infer U> ? Promise<StrictDeepPickReadonly<U>>
            : T extends Map<infer K, infer V> ? Map<K, StrictDeepPickReadonly<V>>
                : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, StrictDeepPickReadonly<V>>
                    : T extends WeakMap<infer K, infer V> ? WeakMap<K, StrictDeepPickReadonly<V>>
                        : T extends Set<infer U> ? Set<StrictDeepPickReadonly<U>>
                            : T extends ReadonlySet<infer U> ? ReadonlySet<StrictDeepPickReadonly<U>>
                                : T extends WeakSet<infer U> ? WeakSet<StrictDeepPickReadonly<U>>
                                    : T extends (infer U)[] ? StrictDeepPickReadonly<U>[]
                                        : { [P in J]: StrictDeepPickReadonly<Exclude<T[P], undefined>> };

/**
 * Pick all writable properties in T deeply
 */
export type DeepPickWritable<T> = _DeepPickWritable<T>;
type _DeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<DeepPickWritable<U>>
                    : T extends Map<any, any> ? T
                        : T extends ReadonlyMap<any, any> ? T
                            : T extends WeakMap<any, any> ? T
                                : T extends Set<any> ? T
                                    : T extends ReadonlySet<any> ? T
                                        : T extends WeakSet<any> ? T
                                            : T extends any[] ? T
                                                : { [P in K]: DeepPickWritable<Exclude<T[P], undefined>> };

/**
 * Pick all writable properties in T deeply even in Maps, Sets etc
 */
export type StrictDeepPickWritable<T> = _StrictDeepPickWritable<T>
type _StrictDeepPickWritable<T, K extends keyof T = WritableKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<StrictDeepPickWritable<U>>
                    : T extends Map<infer K, infer V> ? Map<K, StrictDeepPickWritable<V>>
                        : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, StrictDeepPickWritable<V>>
                            : T extends WeakMap<infer K, infer V> ? WeakMap<K, StrictDeepPickWritable<V>>
                                : T extends Set<infer U> ? Set<StrictDeepPickWritable<U>>
                                    : T extends ReadonlySet<infer U> ? ReadonlySet<StrictDeepPickWritable<U>>
                                        : T extends WeakSet<infer U> ? WeakSet<StrictDeepPickWritable<U>>
                                            : T extends (infer U)[] ? StrictDeepPickWritable<U>[]
                                                : { -readonly [P in K]: StrictDeepPickWritable<Exclude<T[P], undefined>> }

/**
 * Pick all JSON friendly properties in T deeply
 */
export type DeepPickJson<T> = _DeepPickJson<T>
type _DeepPickJson<T, Keys extends keyof T = JsonKeys<T>> =
    T extends Builtin ? T
        : IfTuple<T> extends true ? T
            : IfClass<T> extends true ? T
                : T extends Promise<infer U> ? Promise<DeepPickJson<U>>
                    : T extends Map<any, any> ? T
                        : T extends ReadonlyMap<any, any> ? T
                            : T extends WeakMap<any, any> ? T
                                : T extends Set<any> ? T
                                    : T extends ReadonlySet<any> ? T
                                        : T extends WeakSet<any> ? T
                                            : T extends any[] ? T
                                                : { [P in Keys]: DeepPickJson<Exclude<T[P], undefined>> };
