import {
  IfEquals, IfCompatible, IfUndefined,
  IfJson, IfNull, IfFunction
} from './type-check';

/**
 * KeyOf
 * @desc Returns the union type of all the keys in a type
 */
export type KeysOf<T> = keyof T;

/**
 * ValuesOf
 * @desc Returns the union type of all the values in a type
 */
export type ValuesOf<T> = T[keyof T];

/**
 * RequiredKeys
 * @desc Returns required keys of an object
 */
export type RequiredKeys<T> = _RequiredKeys<T>
export type _RequiredKeys<T> = ValuesOf<{
  [K in keyof T]-?: IfUndefined<T[K]> extends true ? never
      : T extends { [K1 in K]: any } ? K
          : never
}>;

/**
 * OptionalKeys
 * @desc Returns optional keys of an object
 */
export type OptionalKeys<T> = _OptionalKeys<T>
export type _OptionalKeys<T> = ValuesOf<{
  [K in keyof T]-?: IfUndefined<T[K]> extends true ? never
      : T extends { [K1 in K]: any } ? never
          : K
}>;


/**
 * @desc Returns readonly keys of an object
 */
export type ReadonlyKeys<T> = _ReadonlyKeys<T>
type _ReadonlyKeys<T, J = Required<T>> = ValuesOf<{
  [K in keyof J]: K extends symbol ? never
      : IfEquals<{ [Q in K]: J[K] }, { -readonly [Q in K]: J[K] }, never, K>
}>;

/**
 * @desc Returns JSON friendly keys of an object
 */
export type JsonKeys<T> = _JsonKeys<T>;
type _JsonKeys<T, J = Required<T>> = ValuesOf<{
  [K in keyof J]: K extends symbol ? never
      : IfNull<J[K]> extends true ? K
          : IfJson<Exclude<J[K], undefined>> extends true ? K
              : never
}>;

/**
 * @desc Returns writable keys of an object
 */
export type WritableKeys<T> = _WritableKeys<T>;
type _WritableKeys<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never
      : IfEquals<{ [Q in K]: T[K] }, { readonly [Q in K]: T[K] }, never, K>
}>;


/**
 * @desc Returns writable json keys of an object
 */
export type WritableJsonKeys<T> = Extract<WritableKeys<T>, JsonKeys<T>>;

/**
 * @desc Returns Function keys of an object
 */
export type FunctionKeys<T> = _FunctionKeys<T>;
type _FunctionKeys<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never
      : IfFunction<T[K]> extends true ? K : never;
}>;

/**
 * @desc Returns non function keys of an object
 */
export type NonFunctionKeys<T> = _NonFunctionKeys<T>;
type _NonFunctionKeys<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never
      : IfFunction<T[K]> extends true ? never : K;
}>;


/**
 * @desc Returns keys that match given type
 */
export type KeysCompatible<T, U> = _KeysCompatible<T, U>;
type _KeysCompatible<T, U> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never
      : IfCompatible<T[K], U, K, never>;
}>;

/**
 * @desc Returns keys that equals given type
 */
export type KeysEquals<T, U> = _KeysEquals<T, U>;
type _KeysEquals<T, U> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never
      : IfEquals<T[K], U, K, never>;
}>;

