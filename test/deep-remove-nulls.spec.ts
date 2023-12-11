import { exact } from './_support/asserts';
import { DeepRemoveNulls, HighDeepRemoveNulls } from '../lib';

describe('DeepRemoveNulls', function () {

  test('DeepRemoveNulls', () => {
    type I1 = {
      a?: number | null;
      b: {
        a?: string | null
        b: null
      } | null;
      readonly c: { readonly a: string | null }[]
      n: never | null;
      m?: never | null;
    }
    exact<DeepRemoveNulls<I1>, {
      a?: number;
      b: {
        a?: string
      };
      readonly c: { readonly a: string | null }[]
    }>(true);
  });


  test('HighDeepWritable', () => {
    type I1 = {
      a?: number | null;
      b: {
        a?: string | null
        b: null
      } | null;
      readonly c: { readonly a: string | null }[]
      n: never | null;
      m?: never | null;
    }
    exact<HighDeepRemoveNulls<I1>, {
      a?: number;
      b: {
        a?: string
      };
      readonly c: { readonly a: string }[]
    }>(true);
  });


});
