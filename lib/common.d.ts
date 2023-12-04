/**
 * BasicPrimitive
 * @desc Type representing [`BasicPrimitive`](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html#smarter-type-alias-preservation) types in TypeScript
 */
type BasicPrimitive = number | string | boolean;


/**
 * Primitive
 * @desc Type representing [`Primitive`](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types
 * in TypeScript: `string | number | bigint | boolean |  symbol | null | undefined`
 */
export type Primitive = BasicPrimitive | null | bigint | symbol | undefined;

/**
 * JsonTypes
 * @desc Type representing JSON types in TypeScript
 */
type JsonType = BasicPrimitive | null | object | (BasicPrimitive | object)[]


/**
 * Builtin
 * @desc Type representing Builtin types in JavaScript
 */
export type Builtin = Primitive | Function | String | Number | Date | Error | RegExp |
    ArrayBuffer | DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array |
    Int32Array | Uint32Array | Float32Array | Float64Array;

/**
 * Maybe
 * @desc Type representing T | undefined
 */
export type Maybe<T> = T | undefined;

/**
 * Nullish
 * @desc Type representing [nullish values][https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing] in TypeScript: `null | undefined`
 */
export type Nullish<T = null> = T | undefined | null;

/**
 * Falsy
 * @desc Type representing falsy values in TypeScript: `false | "" | 0 | null | undefined`
 */
export type Falsy = false | '' | 0 | null | undefined;


export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;


export type Thunk<T, Args extends any[] = any[]> = T | ((...args: Args) => T);
export type ThunkAsync<T, Args extends any[] = any[]> = Thunk<T> | ((...args: Args) => Promise<T>);
export type TypeThunk<T = any> = Thunk<Type<T>>;
export type TypeThunkAsync<T = any> = ThunkAsync<Type<T>>;


/**
 * PropertyType
 * @desc Returns the type of property at a given key `K`
 */
export type PropertyType<T, K extends keyof T> = T[K];

/**
 * $ElementType
 * @desc Returns the type of elements inside of array, tuple or object of type `T`, that matches the given index type `K`
 */
export type ElementType<T extends { [P in K & any]: any },
    K extends keyof T | number> = T[K];


/**
 * Type
 * @desc Represents constructor of type T
 */
export interface Type<T = any> {
  new(...args: any[]): T;
}

/**
 * Class
 * @desc Represents Class constructor of type T
 */
export type Class<Args extends any[] = any[], Instance = {}, Static = {}> =
    (new(...args: Args) => Instance) & Static;

/**
 * NoUnion
 * @desc Returns "never" if the type is union
 */
type NoUnion<T, U = T> = T extends U ? [U] extends [T] ? T : never : never;


/**
 * Opaque
 * @desc Create unique type that can't be assigned to base type by accident.
 */
declare namespace Symbols {
  export const base: unique symbol;
  export const brand: unique symbol;
}
type Opaque<T, N extends string> = T & {
  readonly [Symbols.base]: N;
  readonly [Symbols.brand]: N;
}
