import { exact } from './_support/asserts';
import { DeepWritable, HighDeepWritable } from '../lib';

describe('DeepWritable', function () {

  test('DeepWritable', () => {
    type I1 = {
      readonly a?: number;
      readonly b: {
        a?: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[]
      n: never;
      m?: never;
    }
    exact<DeepWritable<I1>, {
      a?: number;
      b: {
        a?: string;
        b: number
      };
      c: { readonly a: string }[]
    }>(true);
  });


  test('HighDeepWritable', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        b: number;
        n: never;
        m?: never;
      };
      c: { a: string }[]
    }
    exact<HighDeepWritable<I1>, {
      a?: number;
      b: {
        a?: string;
        b: number;
      };
      c: { a: string }[]
    }>(true);
  });


});
