import type {
  DeeperMutable,
  DeepMutable,
  Mutable,
  MutableSome,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Mutable', () => {
  test('MutableSome', () => {
    type I1 = {
      readonly a?: number;
      readonly b: string;
      readonly c: string;
    };

    exact<
      MutableSome<I1, 'a' | 'b'>,
      {
        a?: number;
        b: string;
        readonly c: string;
      }
    >(true);
  });

  test('Mutable', () => {
    type unmodified = { readonly a?: number; readonly b: number };
    type I1 = {
      readonly a?: number;
      readonly b: unmodified;
      readonly c: unmodified[];
      readonly n: never;
      readonly m?: never;
    };
    exact<
      Mutable<I1>,
      {
        a?: number;
        b: unmodified;
        c: unmodified[];
      }
    >(true);
  });

  test('DeepMutable', () => {
    type unmodified = { readonly a?: number; readonly b: number };
    type modified = { a?: number; b: number };
    type I1 = {
      readonly a?: number;
      readonly b: unmodified;
      readonly c: unmodified[];
      readonly n: never;
      readonly m?: never;
    };
    exact<
      DeepMutable<I1>,
      {
        a?: number;
        b: modified;
        c: unmodified[];
      }
    >(true);
  });

  test('DeeperMutable', () => {
    type unmodified = { readonly a?: number; readonly b: number };
    type modified = { a?: number; b: number };
    type I1 = {
      readonly a?: number;
      readonly b: unmodified;
      readonly c: unmodified[];
      readonly n: never;
      readonly m?: never;
    };
    exact<
      DeeperMutable<I1>,
      {
        a?: number;
        b: modified;
        c: modified[];
      }
    >(true);
  });
});
