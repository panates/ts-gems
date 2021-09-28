import {NonObj} from './common';

/**
 * Returns Y if typeof T is "never", N otherwise
 */
export type IsExtends<T, U> = [T] extends [U] ? true : false;

/**
 * Returns Y if typeof T is "never", N otherwise
 */
export type IfNever<T, Y, N = never> = [T] extends [never] ? Y : N;

/**
 * Returns true if typeof T is "never", false otherwise
 */
export type IsNever<T> = IfNever<T, true, false>;

/**
 * Returns Y if typeof T is "any", N otherwise
 */
export type IfAny<T, Y = T, N = never> = 0 extends (1 & T) ? Y : N;

/**
 * Returns true if typeof T is "any", false otherwise
 */
export type IsAny<T> = IfAny<T, true, false>;

/**
 * Returns Y if typeof T is "unknown", N otherwise
 */
export type IfUnknown<T, Y, N = never> =
    unknown extends T ?
            IsAny<T> extends false
                ? IfEmptyObject<T, N, Y>
                : N
            : N;
/**
 * Returns true if typeof T is "unknown", false otherwise
 */
export type IsUnknown<T> = IfUnknown<T, true, false>;

/**
 * Returns Y if typeof T is a tuple, N otherwise
 */
export type IfTuple<T, Y = T, N = never> =
    IsNever<T> extends true
        ? N
        : T extends any[]
            ? number extends T['length'] ? N : Y
            : N;

/**
 * Returns true if typeof T is a tuple, false otherwise
 */
export type IsTuple<T> = IfTuple<T, true, false>;

/**
 * Returns Y if typeof T is an object, N otherwise
 */
export type IfObject<T, Y = T, N = never> =
    IfNever<T, N,
        T extends object
            ? T extends NonObj | any[]
                ? N
                : Y
            : N>;

/**
 * Returns true if typeof T is an object, false otherwise
 */
export type IsObject<T> = IfObject<T, true, false>;

/**
 * Returns Y if typeof T is an empty object, N otherwise
 */
export type IfEmptyObject<T extends {}, Y = T, N = never> =
    IsNever<T> extends true
        ? N
        : T extends object
            ? keyof T extends never ? Y : N
            : N

/**
 * Returns true if typeof T is an empty object, false otherwise
 */
export type IsEmptyObject<T extends {}> = IfEmptyObject<T, true, false>;


/**
 * Returns Y if T1 is exactly same with T2, N otherwise
 */
type IfEquals<T1, T2, Y = T1, N = never> =
    (<G>() => G extends T1 ? 1 : 2) extends (<G>() => G extends T2 ? 1 : 2) ? Y : N;

/**
 * Returns true if T1 is exactly same with T2, false otherwise
 */
export type IsEquals<T1, T2> = IfEquals<T1, T2, true, false>;
