import { exact } from './_support/asserts';
import { DeepReadonly, HighDeepReadonly } from '../lib';

describe('DeepReadonly', function () {

  test('DeepReadonly', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        b: number
      };
      c: { a: string }[],
      n: never;
      m?: never;
    }
    exact<DeepReadonly<I1>, {
      readonly a?: number;
      readonly b: {
        readonly a?: string;
        readonly b: number
      };
      readonly c: { a: string }[]
    }>(true);
  });


  test('HighDeepReadonly', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        b: number
      };
      readonly c: { a: string }[],
      n: never;
      m?: never;
    }
    exact<HighDeepReadonly<I1>, {
      readonly a?: number;
      readonly b: {
        readonly a?: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[];
    }>(true);
  });


});
