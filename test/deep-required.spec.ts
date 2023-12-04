import { exact } from './_support/asserts';
import { DeepRequired, HighDeepRequired } from '../lib';

describe('DeepRequired', function () {

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


  test('HighDeepRequired', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[]
    }
    exact<HighDeepRequired<I1>, {
      a: number;
      b: {
        a: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[]
    }>(true);
  });

});
