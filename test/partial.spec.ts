import type {
  DeeperOmitOptional,
  DeeperPartial,
  DeeperPickOptional,
  DeepOmitOptional,
  DeepPartial,
  DeepPickOptional,
  OmitOptional,
  OptionalKeys,
  PartialSome,
  Type,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('DeepPartial', () => {
  it('PartialSome', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: string;
    };

    exact<
      PartialSome<I1, 'a' | 'b'>,
      {
        a?: number;
        readonly b?: string;
        readonly c: string;
      }
    >(true);
  });

  it('DeepPartial', () => {
    type unmodified = { a?: number; b: string };
    type modified = { a?: number; b?: string };
    type I1 = {
      a?: {
        a1: boolean;
        a2: unmodified;
        a3?: unmodified[];
        a4?: Map<string, unmodified>;
        a5?: Type<unmodified>;
        a6: number | undefined;
        readonly a7: number;
        n: never;
        m?: never;
      };
      b: string;
      readonly c?: unmodified[];
      n?: never;
    };

    exact<
      DeepPartial<I1>,
      {
        a?: {
          a1?: boolean;
          a2?: modified;
          a3?: unmodified[];
          a4?: Map<string, unmodified>;
          a5?: Type<unmodified>;
          a6?: number;
          readonly a7?: number;
        };
        b?: string;
        readonly c?: unmodified[];
      }
    >(true);
  });

  it('DeepPartial leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags: readonly string[] };
    exact<DeepPartial<I1>, { tags?: readonly string[] }>(true);
  });

  it('DeeperPartial', () => {
    type unmodified = { a?: number; b: string };
    type modified = { a?: number; b?: string };
    type I1 = {
      a?: {
        a1: boolean;
        a2: unmodified;
        a3?: unmodified[];
        a4?: Map<string, unmodified>;
        a5?: Type<unmodified>;
        a6: number | undefined;
        readonly a7: number;
        n: never;
        m?: never;
      };
      b: string;
      readonly c?: unmodified[];
      n?: never;
    };

    exact<
      DeeperPartial<I1>,
      {
        a?: {
          a1?: boolean;
          a2?: modified;
          a3?: modified[];
          a4?: Map<string, unmodified>;
          a5?: Type<unmodified>;
          a6?: number;
          readonly a7?: number;
        };
        b?: string;
        readonly c?: modified[];
      }
    >(true);
  });

  it('DeeperPartial makes a readonly array property fully mutable', () => {
    type I1 = { tags: readonly string[] };
    exact<DeeperPartial<I1>, { tags?: string[] }>(true);
  });

  it('DeepPartial preserves a `| null` member on nested objects', () => {
    // Regression test: recursing with NonNullable<T[K]> instead of
    // Exclude<T[K], undefined> silently drops `null` from the result.
    type Inner = { b: number };
    type I1 = { a: Inner | null };
    exact<DeepPartial<I1>, { a?: { b?: number } | null }>(true);
  });

  it('DeeperPartial preserves a `| null` member on nested objects and arrays', () => {
    type Inner = { b: number };
    type I1 = { a: Inner | null; c: Inner[] | null };
    exact<
      DeeperPartial<I1>,
      { a?: { b?: number } | null; c?: { b?: number }[] | null }
    >(true);
  });

  it('DeeperPartial preserves tuples', () => {
    type I1 = {
      a: [string, number];
    };
    exact<
      DeeperPartial<I1>,
      {
        a?: [string, number];
      }
    >(true);
  });

  it('OptionalKeys', () => {
    type I1 = { a?: number; b: string };
    exact<OptionalKeys<I1>, 'a'>(true);
  });

  it('OmitOptional', () => {
    type I1 = { a?: number; b: string };
    exact<OmitOptional<I1>, { b: string }>(true);
  });

  it('DeepPickOptional', () => {
    type I1 = { a?: number; b: string };
    exact<DeepPickOptional<I1>, { a?: number }>(true);
  });

  it('DeepOmitOptional', () => {
    type I1 = { a?: number; b: string };
    exact<DeepOmitOptional<I1>, { b: string }>(true);
  });

  it('DeeperPickOptional', () => {
    type I1 = { a?: number; b: string };
    exact<DeeperPickOptional<I1>, { a?: number }>(true);
  });

  it('DeeperOmitOptional', () => {
    type I1 = { a?: number; b: string };
    exact<DeeperOmitOptional<I1>, { b: string }>(true);
  });
});
