import {exact} from './_support/asserts';
import {Nullish} from '../lib';
import {DeepBuildable, DeepNullish, DeepPartial, DeepReadonly, DeepRequired, DeepWritable} from '../lib/deep-modify';

describe('Deep Modify', function () {

    test('DeepPartial', () => {
        type I1 = {
            a?: number;
            b: {
                a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }
        exact<DeepPartial<I1>, {
            a?: number;
            b?: {
                a?: string;
                readonly b?: number
            };
            readonly c?: { readonly a?: string }[]
        }>(true);
    });

    test('DeepBuildable', () => {
        type I1 = {
            a?: number;
            b: {
                a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }
        exact<DeepBuildable<I1>, {
            a?: number;
            b?: {
                a?: string;
                b?: number
            };
            c?: { a?: string }[]
        }>(true);
    });

    test('DeepRequired', () => {
        type I1 = {
            a?: number;
            b: {
                a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }
        exact<DeepRequired<I1>, {
            a: number;
            b: {
                a: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }>(true);
    });

    test('DeepReadonly', () => {
        type I1 = {
            a?: number;
            b: {
                a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }
        exact<DeepReadonly<I1>, {
            readonly a?: number;
            readonly b: {
                readonly a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }>(true);
    });

    test('DeepWritable', () => {
        type I1 = {
            a?: number;
            b: {
                a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }
        exact<DeepWritable<I1>, {
            a?: number;
            b: {
                a?: string;
                b: number
            };
            c: { a: string }[]
        }>(true);
    });

    test('DeepNullish', () => {
        type I1 = {
            a?: number;
            b: {
                a?: string;
                readonly b: number
            };
            readonly c: { readonly a: string }[]
        }
        exact<DeepNullish<I1>, {
            a: Nullish<number>;
            b: Nullish<{
                a: Nullish<string>;
                readonly b: Nullish<number>
            }>;
            readonly c: Nullish<Nullish<{ readonly a: string }>[]>
        }>(true);
    });

});
