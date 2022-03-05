import {exact} from './_support/asserts';
import {
    KeysOf,
    ValuesOf,
    OptionalKeys,
    ReadonlyKeys,
    RequiredKeys,
    WritableKeys,
    NonFunctionKeys,
    FunctionKeys, KeysCompatible, JsonKeys, WritableJsonKeys, KeysEquals
} from '../lib';

describe('Keys', function () {

    test('KeysOf', () => {
        type I1 = { a: number; b?: undefined; c?: {}, d: undefined, e: null, f: never };
        exact<KeysOf<I1>, 'a' | 'b' | 'c' | 'd' | 'e' | 'f'>(true);
    });

    test('ValuesOf', () => {
        type I1 = { a: number; b?: undefined; c?: {}, d: undefined, e: null, f: never };
        exact<ValuesOf<I1>, number | undefined | null | {}>(true);
    });

    test('OptionalKeys', () => {
        type I1 = { a: number; b?: undefined; c?: {}; d: undefined; e: null; hello(): string; }
        exact<OptionalKeys<I1>, 'c'>(true);
    });

    test('RequiredKeys', () => {
        type I1 = { a: number; b?: undefined; c?: {}, d: undefined, e: null };
        exact<RequiredKeys<I1>, 'a' | 'e'>(true);
    });

    test('ReadonlyKeys', () => {
        type I1 = { readonly a: number; b?: undefined };
        exact<ReadonlyKeys<I1>, 'a'>(true);
    });

    test('NonFunctionKeys', () => {
        type I1 = { readonly a: number; b?: undefined; c: () => string }
        exact<NonFunctionKeys<I1>, 'a' | 'b'>(true);
    });

    test('JsonKeys', () => {
        type I1 = {
            a: number; b?: string; c: boolean, d: null,
            e: symbol; f: undefined, g: never, h: unknown,
            k: () => string,
            l?: string | undefined,
            [Symbol.species]: string
        }
        exact<JsonKeys<I1>, 'a' | 'b' | 'c' | 'd' | 'h' | 'l'>(true);
    });

    test('WritableKeys', () => {
        type I1 = { readonly a: number; b?: undefined; c: () => string, d: any }
        exact<WritableKeys<I1>, 'b' | 'd' | 'c'>(true);
    });

    test('WritableJsonKeys', () => {
        type I1 = {
            readonly a: number; b?: string; c: boolean, d: null,
            e: symbol; f: undefined, g: never, h: unknown,
            k: () => string
        }
        exact<WritableJsonKeys<I1>, 'b' | 'c' | 'd' | 'h'>(true);
    });

    test('FunctionKeys', () => {
        function fn1() {
        }

        interface I1 {
            a: number;
            b?: undefined;
            c?: {};
            d: () => void;
            e: typeof fn1

            hello(): string;
        }

        exact<FunctionKeys<I1>, 'd' | 'e' | 'hello'>(true);
        exact<FunctionKeys<I1>, 'a'>(false);
    });

    test('KeysCompatible', () => {
        interface Example1 {
            a: number;
            b: undefined,
            c: {},
            d: number,
            e: null,
            f: never,
            h: any,
            i: unknown,
            j: string | number,
            k: () => void
        }

        exact<KeysCompatible<Example1, number>, 'a' | 'd' | 'h' | 'i' | 'j'>(true);
        exact<KeysCompatible<Example1, {}>, 'c' | 'h' | 'i'>(true);
        exact<KeysCompatible<Example1, null>, 'e'>(true);
        exact<KeysCompatible<Example1, undefined>, 'b'>(true);
        exact<KeysCompatible<Example1, () => void>, 'h' | 'i' | 'k'>(true);
        exact<KeysCompatible<Example1, Function>, 'h' | 'i' | 'k'>(true);
    });

    test('KeysEquals', () => {
        interface Example1 {
            a: number;
            b: undefined,
            c: {},
            d: number,
            e: null,
            f: never,
            h: any,
            i: unknown,
            j: string | number,
            k: () => void,
            l: Function
        }

        exact<KeysEquals<Example1, number>, 'a' | 'd'>(true);
        exact<KeysEquals<Example1, number | string>, 'j'>(true);
        exact<KeysEquals<Example1, {}>, 'c'>(true);
        exact<KeysEquals<Example1, null>, 'e'>(true);
        exact<KeysEquals<Example1, undefined>, 'b'>(true);
        exact<KeysEquals<Example1, () => void>, 'k'>(true);
        exact<KeysEquals<Example1, Function>, 'l'>(true);
    });

});
