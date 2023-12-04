import { exact } from './_support/asserts';
import { DeepNullish, HighDeepNullish } from '../lib';

describe('DeepNullish', function () {

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
      a?: number | null;
      b?: {
        a?: string | null;
        readonly b?: number | null
      } | null;
      readonly c?: { readonly a: string }[] | null
    }>(true);

  });

  test('HighDeepNullish', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[]
    }

    exact<HighDeepNullish<I1>, {
      a?: number | null;
      b?: {
        a?: string | null;
        readonly b?: number | null
      } | null;
      readonly c?: { readonly a?: string | null }[] | null
    }>(true);

  });

});
