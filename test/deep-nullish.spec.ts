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
      a: number | null | undefined;
      b: {
        a: string | null | undefined;
        readonly b: number | null | undefined
      } | null | undefined;
      readonly c: { readonly a: string }[] | null | undefined
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
      a: number | null | undefined;
      b: {
        a: string | null | undefined;
        readonly b: number | null | undefined
      } | null | undefined;
      readonly c: { readonly a: string | null | undefined }[] | null | undefined
    }>(true);

  });

});
