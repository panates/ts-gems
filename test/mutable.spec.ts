import type {
  DeeperMutable,
  DeeperOmitMutable,
  DeeperPickMutable,
  DeepMutable,
  DeepOmitMutable,
  DeepPickMutable,
  Mutable,
  MutableKeys,
  MutableSome,
  OmitMutable,
  PickMutable,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Mutable', () => {
  it('MutableSome', () => {
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

  it('Mutable', () => {
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

  it('DeepMutable', () => {
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

  it('DeeperMutable', () => {
    type unmodified = { readonly a?: number; readonly b: number };
    type modified = { a?: number; b: number };
    type I1 = {
      readonly a?: number;
      readonly b: unmodified;
      readonly c: unmodified[];
      readonly d: readonly [unmodified, number];
      readonly n: never;
      readonly m?: never;
    };
    exact<
      DeeperMutable<I1>,
      {
        a?: number;
        b: modified;
        c: modified[];
        d: [modified, number];
      }
    >(true);
  });

  it('DeepMutable leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { readonly tags: readonly string[] };
    exact<DeepMutable<I1>, { tags: readonly string[] }>(true);
  });

  it('DeeperMutable makes a readonly array property fully mutable', () => {
    type I1 = { readonly tags: readonly string[] };
    exact<DeeperMutable<I1>, { tags: string[] }>(true);
  });

  it('DeepMutable preserves a `| null` member on nested objects', () => {
    // Regression test: recursing with NonNullable<T[K]> instead of
    // Exclude<T[K], undefined> silently drops `null` from the result.
    type Inner = { readonly b: number };
    type I1 = { readonly a: Inner | null };
    exact<DeepMutable<I1>, { a: { b: number } | null }>(true);
  });

  it('DeeperMutable preserves a `| null` member on nested objects and arrays', () => {
    type Inner = { readonly b: number };
    type I1 = { readonly a: Inner | null; readonly c: Inner[] | null };
    exact<
      DeeperMutable<I1>,
      { a: { b: number } | null; c: { b: number }[] | null }
    >(true);
  });

  it('MutableKeys', () => {
    type I1 = { readonly a: number; b: string };
    exact<MutableKeys<I1>, 'b'>(true);
  });

  it('PickMutable', () => {
    type I1 = { readonly a: number; b: string };
    exact<PickMutable<I1>, { b: string }>(true);
  });

  it('OmitMutable', () => {
    type I1 = { readonly a: number; b: string };
    exact<OmitMutable<I1>, { readonly a: number }>(true);
  });

  it('DeepPickMutable', () => {
    type I1 = { readonly a: number; b: string };
    exact<DeepPickMutable<I1>, { b: string }>(true);
  });

  it('DeepOmitMutable', () => {
    type I1 = { readonly a: number; b: string };
    exact<DeepOmitMutable<I1>, { readonly a: number }>(true);
  });

  it('DeeperPickMutable', () => {
    type I1 = { readonly a: number; b: string };
    exact<DeeperPickMutable<I1>, { b: string }>(true);
  });

  it('DeeperOmitMutable', () => {
    type I1 = { readonly a: number; b: string };
    exact<DeeperOmitMutable<I1>, { readonly a: number }>(true);
  });
});
