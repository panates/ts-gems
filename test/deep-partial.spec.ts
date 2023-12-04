import { exact } from './_support/asserts';
import { DeepPartial, HighDeepPartial } from '../lib';

describe('DeepPartial', function () {

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
      readonly c?: { readonly a: string }[]
    }>(true);
  });

  test('HighDeepPartial', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[]
    }
    exact<HighDeepPartial<I1>, {
      a?: number;
      b?: {
        a?: string;
        readonly b?: number
      };
      readonly c?: { readonly a?: string }[]
    }>(true);
  });

});
