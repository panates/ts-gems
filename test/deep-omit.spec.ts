import {exact} from './_support/asserts';
import {
    DeepOmitJson, DeepOmitOptional, DeepOmitReadonly, DeepOmitRequired, DeepOmitWritable,
} from '../lib';

describe('DeepOmit', function () {

    test('DeepOmitOptional', () => {
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
        exact<DeepOmitOptional<I1>, {
            b: string,
            c: { b: number },
            e: { b: number }[],
        }>(true);
    });

    test('DeepOmitRequired', () => {
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
        exact<DeepOmitRequired<I1>, {
            a?: number;
            d?: {
                a?: string;
            },
            f?: { a?: string }[]
        }>(true);
    });

    test('DeepOmitReadonly', () => {
        type I1 = {
            a: number;
            readonly b: string;
            readonly c: {
                a: string;
                readonly b: number;
            };
            readonly d?: {
                readonly a?: string;
                b: number;
            };
            e: { a?: string; readonly b: number }[];
            readonly f?: { readonly a?: string; b: number }[];
            g: () => void;
            readonly h: () => void;
        }
        exact<DeepOmitReadonly<I1>, {
            a: number;
            e: { a?: string }[];
            g: () => void;
        }>(true);
    });

    test('DeepOmitWritable', () => {
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

        exact<DeepOmitWritable<I1>, {
            readonly b: string;
            readonly d?: {
                readonly a?: string;
            };
            readonly f?: { readonly a?: string; }[];
            readonly h: () => void;
        }>(true);
    });

    test('DeepOmitJson', () => {
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
            [Symbol.species]: number;
        }
        exact<DeepOmitJson<I1>, {
            h: () => void
            [Symbol.species]: number;
        }>(true);
    });

});
