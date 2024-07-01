import { assert } from './_support/asserts';
import {
  IfAny,
  IfEmptyObject,
  IfEquals,
  IfNever,
  IfObject,
  IfTuple,
  IfCompatible,
  IfUndefined,
  IfUnknown,
  IfFunction,
  IfClass,
  IfNull,
  IfNullish,
  IfPrimitive,
  IfTupleOrAny,
  IfPrimitiveOrAny,
  IfObjectOrAny,
  IfFunctionOrAny,
  IfClassOrAny,
} from '../lib';

interface NotEmptyObj {
  x: 1;
}

class ClassA {}

function FunctionA() {}

type Indexed<T = any> = Record<string, T>;

describe('Type checks', function () {
  test('IfNever', () => {
    assert<IfNever<never>>(true);
    assert<IfNever<unknown>>(false);
    assert<IfNever<null>>(false);
    assert<IfNever<undefined>>(false);
    assert<IfNever<any>>(false);
    assert<IfNever<number>>(false);
    assert<IfNever<false>>(false);
    assert<IfNever<{}>>(false);
    assert<IfNever<NotEmptyObj>>(false);
  });

  test('IfUndefined', () => {
    assert<IfUndefined<undefined>>(true);
    assert<IfUndefined<never>>(false);
    assert<IfUndefined<any>>(false);
    assert<IfUndefined<unknown>>(false);
    assert<IfUndefined<number>>(false);
    assert<IfUndefined<false>>(false);
    assert<IfUndefined<null>>(false);
    assert<IfUndefined<{}>>(false);
    assert<IfUndefined<NotEmptyObj>>(false);
  });

  test('IfUnknown', () => {
    assert<IfUnknown<any>>(false);
    assert<IfUnknown<never>>(false);
    assert<IfUnknown<unknown>>(true);
    assert<IfUnknown<null>>(false);
    assert<IfUnknown<undefined>>(false);
    assert<IfUnknown<number>>(false);
    assert<IfUnknown<false>>(false);
    assert<IfUnknown<{}>>(false);
    assert<IfUnknown<NotEmptyObj>>(false);
  });

  test('IfNull', () => {
    assert<IfNull<never>>(false);
    assert<IfNull<unknown>>(false);
    assert<IfNull<null>>(true);
    assert<IfNull<undefined>>(false);
    assert<IfNull<any>>(false);
    assert<IfNull<number>>(false);
    assert<IfNull<false>>(false);
    assert<IfNull<{}>>(false);
    assert<IfNull<NotEmptyObj>>(false);
  });

  test('IfNullish', () => {
    assert<IfNullish<never>>(false);
    assert<IfNullish<unknown>>(false);
    assert<IfNullish<null>>(true);
    assert<IfNullish<undefined>>(true);
    assert<IfNullish<any>>(false);
    assert<IfNullish<number>>(false);
    assert<IfNullish<false>>(false);
    assert<IfNullish<{}>>(false);
    assert<IfNullish<NotEmptyObj>>(false);
  });

  test('IfAny', () => {
    assert<IfAny<never>>(false);
    assert<IfAny<unknown>>(false);
    assert<IfAny<null>>(false);
    assert<IfAny<undefined>>(false);
    assert<IfAny<any>>(true);
    assert<IfAny<number>>(false);
    assert<IfAny<false>>(false);
    assert<IfAny<{}>>(false);
    assert<IfAny<NotEmptyObj>>(false);
    assert<IfAny<boolean>>(false);
    assert<IfAny<any[]>>(false);
    assert<IfAny<object>>(false);
    assert<IfAny<{}>>(false);
    assert<IfAny<Indexed>>(false);
    assert<IfAny<Function>>(false);
  });

  test('IfTuple', () => {
    assert<IfTuple<[any]>>(true);
    assert<IfTuple<any[]>>(false);
    assert<IfTuple<any>>(false);
    assert<IfTuple<never>>(false);
    assert<IfTuple<undefined>>(false);
    assert<IfTuple<null>>(false);
  });

  test('IfTupleOrAny', () => {
    assert<IfTupleOrAny<any>>(true);
  });

  test('IfPrimitive', () => {
    assert<IfPrimitive<any>>(true);
    assert<IfPrimitive<number>>(true);
    assert<IfPrimitive<string>>(true);
    assert<IfPrimitive<boolean>>(true);
    assert<IfPrimitive<null>>(true);
    assert<IfPrimitive<bigint>>(true);
    assert<IfPrimitive<symbol>>(true);
    assert<IfPrimitive<undefined>>(true);
    assert<IfPrimitive<[any]>>(false);
    assert<IfPrimitive<any[]>>(false);
    assert<IfPrimitive<symbol[]>>(false);
    assert<IfPrimitive<object>>(false);
    assert<IfPrimitive<never>>(false);
    assert<IfPrimitive<Function>>(false);
  });

  test('IfPrimitiveOrAny', () => {
    assert<IfPrimitiveOrAny<any>>(true);
  });

  test('IfObject', () => {
    assert<IfObject<object>>(true);
    assert<IfObject<{}>>(true);
    assert<IfObject<Indexed>>(true);
    assert<IfObject<Indexed | Object | {}>>(true);
    assert<IfObject<Indexed & Object & {}>>(true);
    assert<IfObject<NotEmptyObj | {}>>(true);
    assert<IfObject<NotEmptyObj>>(true);
    assert<IfObject<number>>(false);
    assert<IfObject<boolean>>(false);
    assert<IfObject<any[]>>(false);
    assert<IfObject<Function>>(false);
    assert<IfObject<never>>(false);
    assert<IfObject<unknown>>(false);
    assert<IfObject<any>>(false);
    assert<IfObject<null>>(false);
    assert<IfObject<undefined>>(false);
    assert<IfObject<{} | boolean>>(true);
    assert<IfObject<Indexed | string>>(true);
    assert<IfObject<object | any[]>>(true);
    assert<IfObject<object & number>>(false);
    assert<IfObject<{} & boolean>>(false);
    assert<IfObject<Indexed & string>>(false);
    assert<IfObject<Indexed & any[]>>(false);
  });

  test('IfObjectOrAny', () => {
    assert<IfObjectOrAny<any>>(true);
  });

  test('IfEmptyObject', () => {
    assert<IfEmptyObject<{}>>(true);
    assert<IfEmptyObject<NotEmptyObj>>(false);
    assert<IfEmptyObject<unknown>>(false);
    assert<IfEmptyObject<undefined>>(false);
    assert<IfEmptyObject<never>>(false);
    assert<IfEmptyObject<null>>(false);
    assert<IfEmptyObject<any>>(false);
    assert<IfEmptyObject<boolean>>(false);
    assert<IfEmptyObject<() => void>>(false);
  });

  test('IfFunction', () => {
    assert<IfFunction<() => void>>(true);
    assert<IfFunction<(a: string) => boolean>>(true);
    assert<IfFunction<ClassA>>(false);
    assert<IfFunction<{}>>(false);
    assert<IfFunction<NotEmptyObj>>(false);
    assert<IfFunction<any>>(false);
    assert<IfFunction<boolean>>(false);
    assert<IfFunction<never>>(false);
    assert<IfFunction<unknown>>(false);
    assert<IfFunction<null>>(false);
    assert<IfFunction<undefined>>(false);
  });

  test('IfFunctionOrAny', () => {
    assert<IfFunctionOrAny<any>>(true);
  });

  test('IfClass', () => {
    assert<IfClass<typeof ClassA>>(true);
    assert<IfClass<typeof FunctionA>>(false);
    assert<IfClass<() => void>>(false);
    assert<IfClass<(a: string) => boolean>>(false);
    assert<IfClass<{}>>(false);
    assert<IfClass<NotEmptyObj>>(false);
    assert<IfClass<any>>(false);
    assert<IfClass<boolean>>(false);
    assert<IfClass<never>>(false);
    assert<IfClass<unknown>>(false);
    assert<IfClass<undefined>>(false);
  });

  test('IfClassOrAny', () => {
    assert<IfClassOrAny<any>>(true);
  });

  test('IfCompatible', () => {
    assert<IfCompatible<number, number>>(true);
    assert<IfCompatible<number, string>>(false);
    assert<IfCompatible<undefined, number>>(false);
    assert<IfCompatible<null, number>>(false);
    assert<IfCompatible<number, number | string>>(true);
    assert<IfCompatible<number | string, number>>(true);
    assert<IfCompatible<() => void, number>>(false);

    assert<IfCompatible<any, number>>(true);
    assert<IfCompatible<number, any>>(true);
    assert<IfCompatible<{}, number>>(false);
    assert<IfCompatible<number, {}>>(false);
    assert<IfCompatible<object, {}>>(true);
    assert<IfCompatible<NotEmptyObj, {}>>(true);
    assert<IfCompatible<{}, NotEmptyObj>>(true);

    assert<IfCompatible<string, unknown>>(true);
    assert<IfCompatible<any, unknown>>(true);
    assert<IfCompatible<1, unknown>>(true);
    assert<IfCompatible<{}, unknown>>(true);
    assert<IfCompatible<undefined, unknown>>(false);
    assert<IfCompatible<null, unknown>>(false);
    assert<IfCompatible<() => void, unknown>>(true);

    assert<IfCompatible<() => boolean, Function>>(true);
    assert<IfCompatible<() => void, (...args: any) => any>>(true);
    assert<IfCompatible<() => boolean, (...args: any) => number>>(false);
    assert<IfCompatible<(...args: any[]) => any, () => void>>(true);
    assert<IfCompatible<(a: string) => any, (...args: any[]) => any>>(true);
    assert<IfCompatible<(b: number) => void, (a: string) => void>>(false);
    assert<IfCompatible<(a: string) => any, () => void>>(false);
    assert<IfCompatible<() => void, (a: string) => void>>(true);
    assert<IfCompatible<() => boolean, () => string>>(false);
    assert<IfCompatible<() => boolean, () => any>>(true);

    assert<IfCompatible<any, (a: string) => void>>(true);
    assert<IfCompatible<'1', (a: string) => void>>(false);
    assert<IfCompatible<{}, (a: string) => void>>(false);
    assert<IfCompatible<undefined, (a: string) => void>>(false);
    assert<IfCompatible<unknown, (a: string) => void>>(true);
    assert<IfCompatible<null, (a: string) => void>>(false);
    assert<IfCompatible<() => number, (a: string) => void | string>>(false);
    assert<IfCompatible<(a: string) => void | string, (a: string) => void>>(
      true,
    );
  });

  test('IfEquals', () => {
    assert<IfEquals<number, number>>(true);
    assert<IfEquals<number, any>>(false);
    assert<IfEquals<number, unknown>>(false);
    assert<IfEquals<number, never>>(false);
    assert<IfEquals<number, null>>(false);
    assert<IfEquals<number, undefined>>(false);
    assert<IfEquals<number, number | string>>(false);
    assert<IfEquals<number, number & string>>(false);
    assert<IfEquals<number, number | {}>>(false);

    assert<IfEquals<any, any>>(true);
    assert<IfEquals<any, any | string>>(true);
    assert<IfEquals<any, any & string>>(true);
    assert<IfEquals<any, any | {}>>(true);
    assert<IfEquals<any, never>>(false);
    assert<IfEquals<any, unknown>>(false);
    assert<IfEquals<any, null>>(false);
    assert<IfEquals<any, undefined>>(false);

    assert<IfEquals<undefined, undefined>>(true);
    assert<IfEquals<undefined, null>>(false);
    assert<IfEquals<undefined, never>>(false);
    assert<IfEquals<undefined, unknown>>(false);

    assert<IfEquals<never, never>>(true);
    assert<IfEquals<never, never & string>>(true);
    assert<IfEquals<never, never | string>>(false);
    assert<IfEquals<never, never | {}>>(false);
    assert<IfEquals<never, unknown>>(false);
    assert<IfEquals<never, null>>(false);

    assert<IfEquals<unknown, unknown>>(true);
    assert<IfEquals<unknown, unknown | string>>(true);
    assert<IfEquals<unknown, unknown | {}>>(true);
    assert<IfEquals<unknown, unknown & string>>(false);
    assert<IfEquals<unknown, never>>(false);
    assert<IfEquals<unknown, null>>(false);
    assert<IfEquals<unknown, any>>(false);
    assert<IfEquals<unknown, Indexed>>(false);

    assert<IfEquals<object, object>>(true);
    assert<IfEquals<object, Indexed>>(false);
    assert<IfEquals<object, object | NotEmptyObj>>(false);
    assert<IfEquals<object, object & NotEmptyObj>>(false);
    assert<IfEquals<object, object | Indexed>>(false);
    assert<IfEquals<object, object & Indexed>>(false);
    assert<IfEquals<object, object & NotEmptyObj>>(false);
    assert<IfEquals<object, NotEmptyObj>>(false);
    assert<IfEquals<object, object | string>>(false);
    assert<IfEquals<object, object & string>>(false);
    assert<IfEquals<object, never>>(false);
    assert<IfEquals<object, null>>(false);
    assert<IfEquals<object, any>>(false);
    assert<IfEquals<object, unknown>>(false);

    assert<IfEquals<Indexed, Indexed>>(true);
    assert<IfEquals<Indexed<string>, Indexed>>(false);
    assert<IfEquals<Indexed, Indexed | NotEmptyObj>>(false);
    assert<IfEquals<Indexed, Indexed & NotEmptyObj>>(false);
    assert<IfEquals<Indexed, NotEmptyObj>>(false);
    assert<IfEquals<Indexed, Indexed | string>>(false);
    assert<IfEquals<Indexed, Indexed & string>>(false);
    assert<IfEquals<Indexed, never>>(false);
    assert<IfEquals<Indexed, null>>(false);
    assert<IfEquals<Indexed, any>>(false);
    assert<IfEquals<Indexed<string>, Indexed<number>>>(false);

    assert<IfEquals<{ x: 1 }, { x?: 1 }>>(false);
    assert<IfEquals<{ x: 1 }, { x?: unknown }>>(false);
    assert<IfEquals<{ x: 1 }, { x?: never }>>(false);
    assert<IfEquals<{ x: 1 }, { x: any }>>(false);

    assert<IfEquals<{ x: undefined }, { x: undefined }>>(true);
    assert<IfEquals<{ x?: undefined }, { x?: undefined }>>(true);
    assert<IfEquals<{ x: undefined }, { x?: undefined }>>(false);

    assert<IfEquals<{ x: null }, { x: null }>>(true);
    assert<IfEquals<{ x?: null }, { x?: null }>>(true);
    assert<IfEquals<{ x: null }, { x?: null }>>(false);

    assert<
      IfEquals<{ x: { y: { z: 1 }[] } }, { x: { y: { z: 1 }[]; a?: number } }>
    >(false);
    assert<
      IfEquals<
        { x: { y: { z: 1 }[]; a?: string } },
        { x: { y: { z: 1 }[]; a?: number } }
      >
    >(false);
    assert<IfEquals<{ x: { y: { z: 1 }[] } }, { x: { y: { z: 1 }[] } }>>(true);
    assert<IfEquals<{ x: { y: { z: 1 }[] } }, { x: { y: { z?: 1 }[] } }>>(
      false,
    );
    assert<IfEquals<{ x: { y: { z: 1 }[] } }, { x: { y?: { z: 1 }[] } }>>(
      false,
    );

    assert<
      IfEquals<(a: number, b: string) => void, (a: number, b: string) => number>
    >(false);
    assert<
      IfEquals<(a: number, b: string) => void, (a: number, b: string) => void>
    >(true);
    assert<
      IfEquals<(a: number, b: string) => any, (a: number, b: string) => number>
    >(false);
    assert<
      IfEquals<(a: number, b: number) => any, (a: number, b: string) => any>
    >(false);
    assert<
      IfEquals<(a: number, b?: string) => any, (a: number, b: string) => any>
    >(false);

    assert<IfEquals<'a' | 'b', 'a' | 'b'>>(true);
    assert<IfEquals<'a' | 'b', 'a'>>(false);
    assert<IfEquals<'a', 'a' | 'b'>>(false);
  });
});
