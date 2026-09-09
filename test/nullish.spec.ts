import type {
  DeeperNullish,
  DeepNullish,
  NullishObject,
  Type,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('DeepNullish', () => {
  it('NullishObject', () => {
    type unmodified = { a?: number; b: string };
    type I1 = {
      a1: boolean;
      a2: unmodified;
      a3?: unmodified[];
      a4?: Map<string, unmodified>;
      a5?: Type<unmodified>;
      a6: number | undefined;
      readonly a7: number;
      n: never;
      m?: never;
      readonly c?: unmodified[];
    };

    exact<
      NullishObject<I1>,
      {
        a1?: boolean | null;
        a2?: unmodified | null;
        a3?: unmodified[] | null;
        a4?: Map<string, unmodified> | null;
        a5?: Type<unmodified> | null;
        a6?: number | null;
        readonly a7?: number | null;
        readonly c?: unmodified[] | null;
      }
    >(true);
  });

  it('DeepNullish', () => {
    type unmodified = { a?: number; b: string };
    type modified = { a?: number | null; b?: string | null };
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
      DeepNullish<I1>,
      {
        a?: {
          a1?: boolean | null;
          a2?: modified | null;
          a3?: unmodified[] | null;
          a4?: Map<string, unmodified> | null;
          a5?: Type<unmodified> | null;
          a6?: number | null;
          readonly a7?: number | null;
        } | null;
        b?: string | null;
        readonly c?: unmodified[] | null;
      }
    >(true);
  });

  it('DeepNullish leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags: readonly string[] };
    exact<DeepNullish<I1>, { tags?: readonly string[] | null }>(true);
  });

  it('DeeperNullish', () => {
    type unmodified = { a?: number; b: string };
    type modified = { a?: number | null; b?: string | null };
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
      DeeperNullish<I1>,
      {
        a?: {
          a1?: boolean | null;
          a2?: modified | null;
          a3?: modified[] | null;
          a4?: Map<string, unmodified> | null;
          a5?: Type<unmodified> | null;
          a6?: number | null;
          readonly a7?: number | null;
        } | null;
        b?: string | null;
        readonly c?: modified[] | null;
      }
    >(true);
  });

  it('DeeperNullish makes a readonly array property fully mutable', () => {
    type I1 = { tags: readonly string[] };
    exact<DeeperNullish<I1>, { tags?: string[] | null }>(true);
  });

  it('DeeperNullish preserves tuples', () => {
    type I1 = {
      a: [string, number];
    };
    exact<
      DeeperNullish<I1>,
      {
        a?: [string, number] | null;
      }
    >(true);
  });
});
