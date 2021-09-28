import {assert, exact} from './_support/asserts';
import {
    IsEquals, OptionalKeys, ReadonlyKeys, RequiredKeys, TypeKeys, WritableKeys,
    PickOptional, PickReadonly, PickRequired, PickWritable, PickType, ReadableKeys, PickReadable,
} from '../lib';

describe('Keys', function () {

    test('OptionalKeys<T>', () => {
        interface I1 {
            a: number;
            b?: undefined;
            c?: {};
            d: undefined;
            e: null;

            hello(): string;
        }

        exact<OptionalKeys<I1>, 'b' | 'c'>(true);
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

    test('ReadableKeys<T>', () => {
        interface I1 {
            readonly a: number;
            b?: undefined
            c: () => string
        }

        exact<ReadableKeys<I1>, 'a' | 'b'>(true);
    });

    test('PickReadable<T>', () => {
        interface I1 {
            readonly a: number;
            b?: undefined,
            c: () => string
        }

        exact<PickReadable<I1>,
            { readonly a: number, b?: undefined }>(true);
    });

    test('WritableKeys<T>', () => {
        interface I1 {
            readonly a: number;
            b?: undefined
            c: () => string
        }

        exact<WritableKeys<I1>, 'b'>(true);
    });

    test('PickWritable<T>', () => {
        interface I1 {
            readonly a: number;
            b?: undefined,
            c: () => string
        }

        exact<PickWritable<I1>,
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
