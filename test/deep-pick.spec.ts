import {exact} from './_support/asserts';
import {
    DeepPickJson, DeepPickOptional, DeepPickReadonly, DeepPickRequired, DeepPickWritable, DeepPickWritableJson,
} from '../lib';

describe('DeepPick', function () {

    test('DeepPickOptional', () => {
        type I1 = {
            a?: number;
            b: string,
            c: {
                a?: string;
                b: number
            },
            d?: {
                a?: string;
                b: number;
            },
            e: { a?: string; b: number }[],
            f?: { a?: string; b: number }[]
        }
        exact<DeepPickOptional<I1>, {
            a?: number;
            d?: { a?: string },
            f?: { a?: string }[]
        }>(true);
    });

    test('DeepPickRequired', () => {
        type I1 = {
            a?: number;
            b: string,
            c: {
                a?: string;
                b: number
            },
            d?: {
                a?: string;
                b: number;
            },
            e: { a?: string; b: number }[],
            f?: { a?: string; b: number }[]
        }
        exact<DeepPickRequired<I1>, {
            b: string,
            c: { b: number },
            e: { b: number }[],
        }>(true);
    });

    test('DeepPickReadonly', () => {
        type I1 = {
            a: number;
            readonly b: string;
            readonly c: {
                a: string;
                readonly b: number
            };
            readonly d?: {
                readonly a?: string;
                b: number;
            };
            e: { a?: string; b: number }[];
            readonly f?: { readonly a?: string; b: number }[];
            g: () => void;
            readonly h: () => void;
        }
        exact<DeepPickReadonly<I1>, {
            readonly b: string;
            readonly c: { readonly b: number };
            readonly d?: {
                readonly a?: string;
            };
            readonly f?: { readonly a?: string }[];
            readonly h: () => void;
        }>(true);
    });

    test('DeepPickWritable', () => {
        type I1 = {
            a: number;
            readonly b: string;
            c: {
                a: string;
                readonly b: number
            };
            readonly d?: {
                readonly a?: string;
                b: number;
            };
            e?: { a?: string; readonly b: number }[];
            readonly f?: { readonly a?: string; b: number }[];
            g: () => void;
            readonly h: () => void;
        }

        exact<DeepPickWritable<I1>, {
            a: number;
            c: {
                a: string;
            };
            e?: { a?: string; }[];
            g: () => void;
        }>(true);
    });

    test('DeepPickJson', () => {
        type I1 = {
            a?: number;
            b: string;
            c: {
                a?: string;
                b: () => void;
            };
            d: string[];
            e?: RegExp;
            f: Date;
            h: () => void
            k?: string | undefined,
            [Symbol.species]: number;
        }
        exact<DeepPickJson<I1>, {
            a?: number;
            b: string;
            c: { a?: string; };
            d: string[];
            e?: RegExp;
            f: Date;
            k?: string | undefined,
        }>(true);
    });

    test('DeepPickWritableJson', () => {
        type I1 = {
            a?: number;
            readonly b: string;
            c: {
                a?: string;
                b: () => void;
            };
            d: string[];
            e?: RegExp;
            f: Date;
            h: () => void,
            k?: string,
            [Symbol.species]: number;
        }
        exact<DeepPickWritableJson<I1>, {
            a?: number;
            c: { a?: string; };
            d: string[];
            e?: RegExp;
            f: Date;
            k?: string,
        }>(true);
    });

});
