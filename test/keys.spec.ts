import {assert, exact} from './_support/asserts';
import {
    IsEquals, OptionalKeys, ReadonlyKeys, RequiredKeys, TypeKeys, WritableKeys,
    PickOptional, PickReadonly, PickRequired, PickWritable, PickType,
} from '../lib';

describe('Keys', function () {

    test('OptionalKeys<T>', () => {
        interface Example1 {
            a: number;
            b?: undefined;
            c?: {},
            d: undefined,
            e: null
        }
        exact<OptionalKeys<Example1>, 'b' | 'c'>(true);
    });

    test('PickOptional<T>', () => {
        exact<PickOptional<{ a: number; b?: undefined; c?: {}, d: undefined, e: null }>,
            { b?: undefined; c?: {} }>(true);
    });

    test('RequiredKeys<T>', () => {
        exact<RequiredKeys<{ a: number; b?: undefined; c?: {}, d: undefined, e: null }>, 'a' | 'd' | 'e'>(true);
    });

    test('PickRequired<T>', () => {
        exact<PickRequired<{ a: number; b?: undefined; c?: {}, d: undefined, e: null }>,
            { a: number, d: undefined, e: null }>(true);
    });

    test('ReadonlyKeys<T>', () => {
        exact<ReadonlyKeys<{ readonly a: number; b?: undefined }>, 'a'>(true);
    });

    test('PickReadonly<T>', () => {
        exact<PickReadonly<{ readonly a: number; b?: undefined }>,
            { readonly a: number }>(true);
    });

    test('WritableKeys<T>', () => {
        exact<WritableKeys<{ readonly a: number; b?: undefined }>, 'b'>(true);
    });

    test('PickWritable<T>', () => {
        exact<PickWritable<{ readonly a: number; b?: undefined }>,
            { b?: undefined }>(true);
    });

    test('TypeKeys<T, V>', () => {
        interface Example1 {
            a: number;
            b: undefined,
            c: {},
            d: number,
            e: null,
            f: never,
            h: any,
            i: unknown,
            j: string | number
        }

        assert<IsEquals<TypeKeys<Example1, number>, 'a' | 'd'>>(true);
        exact<TypeKeys<Example1, {}>, 'c'>(true);
        exact<TypeKeys<Example1, null>, 'e'>(true);
        exact<TypeKeys<Example1, undefined>, 'b'>(true);
    });

    test('PickType<T, V>', () => {
        interface Example1 {
            a: number;
            b?: undefined;
            c: {},
            d: number,
            e: null,
            f: never,
            g: undefined,
            h: any,
            i: unknown,
            j: string | number
        }

        exact<PickType<Example1, number>, { a: number; d: number; }>(true);
    });

});
