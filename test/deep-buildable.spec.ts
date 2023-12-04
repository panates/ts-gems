import { exact } from './_support/asserts';
import { DeepBuildable, HighDeepBuildable } from '../lib';

describe('DeepBuildable', function () {

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
      c?: { readonly a: string }[]
    }>(true);
  });

  test('HighDeepBuildable', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        readonly b: number
      };
      readonly c: { readonly a: string }[]
    }
    exact<HighDeepBuildable<I1>, {
      a?: number;
      b?: {
        a?: string;
        b?: number
      };
      c?: { a?: string }[]
    }>(true);
  });

});
