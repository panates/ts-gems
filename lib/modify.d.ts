/** Like Partial but recursive */
import {Builtin} from './common';
import {IsTuple} from './type-check';

/**
 * Make all properties in T writable
 */
export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};

/**
 * Combination of Partial and Writable
 */
export type Buildable<T> = Partial<Writable<T>>;

/**
 * Combination of DeepPartial and DeepWritable
 */
export type DeepBuildable<T> = DeepPartial<DeepWritable<T>>;

/**
 * Make all properties in T optional deeply
 */
export type DeepPartial<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepPartial<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepPartial<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepPartial<V>>
                    : T extends Set<infer U> ? Set<DeepPartial<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepPartial<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepPartial<U>>
                                : T extends (infer U)[] ? true extends IsTuple<T>
                                        ? { [K in keyof T]?: DeepPartial<T[K]> } : (DeepPartial<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepPartial<U>>
                                        : Partial<T>;

/**
 * Make all properties in T required deeply
 */
export type DeepRequired<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepRequired<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepRequired<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepRequired<V>>
                    : T extends Set<infer U> ? Set<DeepRequired<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepRequired<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepRequired<U>>
                                : T extends (infer U)[] ? true extends IsTuple<T>
                                        ? { [K in keyof T]?: DeepRequired<T[K]> } : (DeepRequired<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepRequired<U>>
                                        : Required<T>;

/**
 * Make all properties in T readonly deeply
 */
export type DeepReadonly<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepReadonly<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepReadonly<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepReadonly<V>>
                    : T extends Set<infer U> ? Set<DeepReadonly<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>>
                                : T extends (infer U)[] ? true extends IsTuple<T>
                                        ? { [K in keyof T]?: DeepReadonly<T[K]> } : (DeepReadonly<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepReadonly<U>>
                                        : Readonly<T>;

/**
 * Make all properties in T writable deeply
 */
export type DeepWritable<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepWritable<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepWritable<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepWritable<V>>
                    : T extends Set<infer U> ? Set<DeepWritable<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepWritable<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepWritable<U>>
                                : T extends (infer U)[] ? true extends IsTuple<T>
                                        ? { [K in keyof T]?: DeepWritable<T[K]> } : (DeepWritable<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepWritable<U>>
                                        : Writable<T>;

/**
 * Make all properties in T nullable deeply
 */
export type DeepNullable<T> =
    T extends Builtin ? T
        : T extends Map<infer K, infer V> ? Map<K, DeepNullable<V>>
            : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<K, DeepNullable<V>>
                : T extends WeakMap<infer K, infer V> ? WeakMap<K, DeepNullable<V>>
                    : T extends Set<infer U> ? Set<DeepNullable<U>>
                        : T extends ReadonlySet<infer U> ? ReadonlySet<DeepNullable<U>>
                            : T extends WeakSet<infer U> ? WeakSet<DeepNullable<U>>
                                : T extends (infer U)[] ? true extends IsTuple<T>
                                        ? { [K in keyof T]?: DeepNullable<T[K]> } : (DeepNullable<U>)[]
                                    : T extends Promise<infer U> ? Promise<DeepNullable<U>>
                                        : T extends {}
                                            ? { [K in keyof T]: DeepNullable<T[K]> }
                                            : T | null | undefined;

