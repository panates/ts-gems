import {exact} from './_support/asserts';
import {
    Buildable,
    Writable,
} from '../lib';

describe('Modify', function () {

    test('Writable', () => {
        type I1 = {
            a?: number;
            readonly b: {
                a?: string;
                readonly b?: number
            };
            readonly c: [{ readonly a: string }]
        }
        exact<Writable<I1>, {
            a?: number;
            b: {
                a?: string;
                readonly b?: number
            };
            c: [{ readonly a: string }]
        }>(true);
    });

    test('Buildable', () => {
        type I1 = {
            a?: number;
            readonly b: {
                a?: string;
                readonly b?: number
            };
            readonly c: [{ readonly a: string }]
        }
        exact<Buildable<I1>, {
            a?: number;
            b?: {
                a?: string;
                readonly b?: number
            };
            c?: [{ readonly a: string }]
        }>(true);
    });

});
