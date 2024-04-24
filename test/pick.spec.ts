import { exact } from './_support/asserts';
import { PickOptional, PickTypes, StrictPickTypes } from '../lib';

describe('Pick', function () {
  test('PickOptional', () => {
    type I1 = {
      a?: number;
      b: string;
      c: {
        a?: string;
        b: number;
      };
      d?: {
        a?: string;
        b: number;
      };
      e: { a?: string; b: number }[];
      f?: { a?: string; b: number }[];
      i: any;
      j?: any;
    };
    exact<
      PickOptional<I1>,
      {
        a?: number;
        d?: {
          a?: string;
          b: number;
        };
        f?: { a?: string; b: number }[];
        j?: any;
      }
    >(true);
  });

  test('PickTypes', () => {
    interface I1 {
      a: number;
      b: undefined;
      c: {};
      d: boolean;
      e: null;
      f: never;
      h: any;
      i: unknown;
      j: string | number | boolean;
      k: () => void;
    }

    exact<
      PickTypes<I1, number>,
      {
        a: number;
        c: {};
        h: any;
        i: unknown;
        j: string | number | boolean;
      }
    >(true);

    exact<
      PickTypes<I1, string | boolean>,
      {
        c: {};
        d: boolean;
        h: any;
        i: unknown;
        j: string | number | boolean;
      }
    >(true);
  });

  test('StrictPickTypes', () => {
    interface I1 {
      a: number;
      b: undefined;
      c: {};
      d: boolean;
      e: null;
      f: never;
      h: any;
      i: unknown;
      j: string | number | boolean;
      k: () => void;
      l: string;
    }

    exact<
      StrictPickTypes<I1, number>,
      {
        a: number;
        j: string | number | boolean;
      }
    >(true);

    exact<
      StrictPickTypes<I1, string | boolean>,
      {
        d: boolean;
        j: string | number | boolean;
        l: string;
      }
    >(true);
  });
});
