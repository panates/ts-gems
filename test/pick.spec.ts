import {exact} from './_support/asserts';
import {
    PickJson, PickOptional, PickReadonly, PickRequired, PickWritable,
} from '../lib';

describe('Pick', function () {

    test('PickOptional', () => {
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
        exact<PickOptional<I1>, {
            a?: number;
            d?: {
                a?: string;
                b: number;
            },
            f?: { a?: string; b: number }[]
        }>(true);
    });

    test('PickRequired', () => {
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
        exact<PickRequired<I1>, {
            b: string,
            c: {
                a?: string;
                b: number
            },
            e: { a?: string; b: number }[],
        }>(true);
    });

    test('PickReadonly', () => {
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
        exact<PickReadonly<I1>, {
            readonly b: string;
            readonly c: {
                a: string;
                readonly b: number
            };
            readonly d?: {
                readonly a?: string;
                b: number;
            };
            readonly f?: { readonly a?: string; b: number }[];
            readonly h: () => void;
        }>(true);
    });

    test('PickWritable', () => {
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

        exact<PickWritable<I1>, {
            a: number;
            c: {
                a: string;
                readonly b: number
            };
            e?: { a?: string; readonly b: number }[];
            g: () => void;
        }>(true);
    });

    test('PickJson', () => {
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
            i: number | undefined
            [Symbol.species]: number;
        }
        exact<PickJson<I1>, {
            a?: number;
            b: string;
            c: {
                a?: string;
                b: () => void;
            };
            d: string[];
            e?: RegExp;
            f: Date;
            i: number | undefined
        }>(true);
    });

});
