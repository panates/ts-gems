import {assert} from './_support/asserts';
import {IsAny, IsEmptyObject, IsEquals, IsNever, IsObject, IsTuple, IsUnknown} from '../lib';

interface NotEmptyObj {
    x: 1;
}

type Indexed<T = any> = Record<string, T>;

describe('Type checks', function () {

    test('IsNever<T>', () => {
        assert<IsNever<never>>(true);
        assert<IsNever<number>>(false);
        assert<IsNever<false>>(false);
        assert<IsNever<{}>>(false);
        assert<IsNever<NotEmptyObj>>(false);
        assert<IsNever<any>>(false);
        assert<IsNever<unknown>>(false);
    });

    test('IsUnknown<T>', () => {
        assert<IsUnknown<unknown>>(true);
        assert<IsUnknown<never>>(false);
        assert<IsUnknown<number>>(false);
        assert<IsUnknown<false>>(false);
        assert<IsUnknown<{}>>(false);
        assert<IsUnknown<NotEmptyObj>>(false);
        assert<IsUnknown<any>>(false);
    });

    test('IsAny<T>', () => {
        assert<IsAny<any>>(true);
        assert<IsAny<number>>(false);
        assert<IsAny<boolean>>(false);
        assert<IsAny<any[]>>(false);
        assert<IsAny<object>>(false);
        assert<IsAny<{}>>(false);
        assert<IsAny<{}>>(false);
        assert<IsAny<Indexed>>(false);
        assert<IsAny<Function>>(false);
        assert<IsAny<never>>(false);
        assert<IsAny<unknown>>(false);
        assert<IsAny<undefined>>(false);
        assert<IsAny<null>>(false);
    });

    test('IsTuple<T>', () => {
        assert<IsTuple<[any]>>(true);
        assert<IsTuple<any[]>>(false);
        assert<IsTuple<any>>(false);
        assert<IsTuple<never>>(false);
        assert<IsTuple<undefined>>(false);
    });

    test('IsObject<T>', () => {
        assert<IsObject<object>>(true);
        assert<IsObject<{}>>(true);
        assert<IsObject<Indexed>>(true);
        assert<IsObject<Indexed | Object | {}>>(true);
        assert<IsObject<Indexed & Object & {}>>(true);
        assert<IsObject<NotEmptyObj | {}>>(true);
        assert<IsObject<NotEmptyObj>>(true);
        assert<IsObject<number>>(false);
        assert<IsObject<boolean>>(false);
        assert<IsObject<any[]>>(false);
        assert<IsObject<Function>>(false);
        assert<IsObject<never>>(false);
        assert<IsObject<unknown>>(false);
        assert<IsObject<any>>(false);
        assert<IsObject<null>>(false);
        assert<IsObject<undefined>>(false);
        assert<IsObject<object | number>>(false);
        assert<IsObject<{} | boolean>>(false);
        assert<IsObject<Indexed | string>>(false);
        assert<IsObject<object | any[]>>(false);
        assert<IsObject<object & number>>(false);
        assert<IsObject<{} & boolean>>(false);
        assert<IsObject<Indexed & string>>(false);
        assert<IsObject<Indexed & any[]>>(false);
    });

    test('IsEmptyObject<T>', () => {
        assert<IsEmptyObject<{}>>(true);
        assert<IsEmptyObject<any>>(false);
        assert<IsEmptyObject<NotEmptyObj>>(false);
        assert<IsEmptyObject<boolean>>(false);
        assert<IsEmptyObject<never>>(false);
    });

    test('IsEquals<T>', () => {

        assert<IsEquals<number, number>>(true);
        assert<IsEquals<number, any>>(false);
        assert<IsEquals<number, unknown>>(false);
        assert<IsEquals<number, never>>(false);
        assert<IsEquals<number, null>>(false);
        assert<IsEquals<number, undefined>>(false);
        assert<IsEquals<number, number | string>>(false);
        assert<IsEquals<number, number & string>>(false);
        assert<IsEquals<number, number | {}>>(false);

        assert<IsEquals<any, any>>(true);
        assert<IsEquals<any, any | string>>(true);
        assert<IsEquals<any, any & string>>(true);
        assert<IsEquals<any, any | {}>>(true);
        assert<IsEquals<any, never>>(false);
        assert<IsEquals<any, unknown>>(false);
        assert<IsEquals<any, null>>(false);
        assert<IsEquals<any, undefined>>(false);

        assert<IsEquals<undefined, undefined>>(true);
        assert<IsEquals<undefined, null>>(false);
        assert<IsEquals<undefined, never>>(false);
        assert<IsEquals<undefined, unknown>>(false);

        assert<IsEquals<never, never>>(true);
        assert<IsEquals<never, never & string>>(true);
        assert<IsEquals<never, never | string>>(false);
        assert<IsEquals<never, never | {}>>(false);
        assert<IsEquals<never, unknown>>(false);
        assert<IsEquals<never, null>>(false);

        assert<IsEquals<unknown, unknown>>(true);
        assert<IsEquals<unknown, unknown | string>>(true);
        assert<IsEquals<unknown, unknown | {}>>(true);
        assert<IsEquals<unknown, unknown & string>>(false);
        assert<IsEquals<unknown, never>>(false);
        assert<IsEquals<unknown, null>>(false);
        assert<IsEquals<unknown, any>>(false);
        assert<IsEquals<unknown, Indexed>>(false);

        assert<IsEquals<object, object>>(true);
        assert<IsEquals<object, Indexed>>(false);
        assert<IsEquals<object, object | NotEmptyObj>>(false);
        assert<IsEquals<object, object & NotEmptyObj>>(false);
        assert<IsEquals<object, object | Indexed>>(false);
        assert<IsEquals<object, object & Indexed>>(false);
        assert<IsEquals<object, object & NotEmptyObj>>(false);
        assert<IsEquals<object, NotEmptyObj>>(false);
        assert<IsEquals<object, object | string>>(false);
        assert<IsEquals<object, object & string>>(false);
        assert<IsEquals<object, never>>(false);
        assert<IsEquals<object, null>>(false);
        assert<IsEquals<object, any>>(false);
        assert<IsEquals<object, unknown>>(false);

        assert<IsEquals<Indexed, Indexed>>(true);
        assert<IsEquals<Indexed<string>, Indexed>>(false);
        assert<IsEquals<Indexed, Indexed | NotEmptyObj>>(false);
        assert<IsEquals<Indexed, Indexed & NotEmptyObj>>(false);
        assert<IsEquals<Indexed, NotEmptyObj>>(false);
        assert<IsEquals<Indexed, Indexed | string>>(false);
        assert<IsEquals<Indexed, Indexed & string>>(false);
        assert<IsEquals<Indexed, never>>(false);
        assert<IsEquals<Indexed, null>>(false);
        assert<IsEquals<Indexed, any>>(false);
        assert<IsEquals<Indexed<string>, Indexed<number>>>(false);

        assert<IsEquals<{ x: 1 }, { x?: 1 }>>(false);
        assert<IsEquals<{ x: 1 }, { x?: unknown }>>(false);
        assert<IsEquals<{ x: 1 }, { x?: never }>>(false);
        assert<IsEquals<{ x: 1 }, { x: any }>>(false);

        assert<IsEquals<{ x: undefined }, { x: undefined }>>(true);
        assert<IsEquals<{ x?: undefined }, { x?: undefined }>>(true);
        assert<IsEquals<{ x: undefined }, { x?: undefined }>>(false);

        assert<IsEquals<{ x: null }, { x: null }>>(true);
        assert<IsEquals<{ x?: null }, { x?: null }>>(true);
        assert<IsEquals<{ x: null }, { x?: null }>>(false);

        assert<IsEquals<{ x: { y: Array<{ z: 1 }> } }, { x: { y: Array<{ z: 1 }>; a?: number } }>>(false);
        assert<IsEquals<{ x: { y: Array<{ z: 1 }>; a?: string } }, { x: { y: Array<{ z: 1 }>; a?: number } }>>(false);
        assert<IsEquals<{ x: { y: Array<{ z: 1 }> } }, { x: { y: Array<{ z: 1 }> } }>>(true);
        assert<IsEquals<{ x: { y: Array<{ z: 1 }> } }, { x: { y: Array<{ z?: 1 }> } }>>(false);
        assert<IsEquals<{ x: { y: Array<{ z: 1 }> } }, { x: { y?: Array<{ z: 1 }> } }>>(false);

        assert<IsEquals<(a: number, b: string) => void, (a: number, b: string) => number>>(false);
        assert<IsEquals<(a: number, b: string) => void, (a: number, b: string) => void>>(true);
        assert<IsEquals<(a: number, b: string) => any, (a: number, b: string) => number>>(false);
        assert<IsEquals<(a: number, b: number) => any, (a: number, b: string) => any>>(false);
        assert<IsEquals<(a: number, b?: string) => any, (a: number, b: string) => any>>(false);

        assert<IsEquals<'a' | 'b', 'a' | 'b'>>(true);
        assert<IsEquals<'a' | 'b', 'a'>>(false);
        assert<IsEquals<'a', 'a' | 'b'>>(false);
    });


});
