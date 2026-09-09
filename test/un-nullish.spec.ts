import type {
  DeeperUnNullish,
  DeepUnNullish,
  Type,
  UnNullish,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('UnNullish', () => {
  it('UnNullish is shallow (does not recurse into nested objects)', () => {
    // Regression test for the doc/behavior mismatch: UnNullish's JSDoc used
    // to (wrongly) claim it strips nullish values "deeply". It doesn't -
    // that's what DeepUnNullish is for. A nested null/undefined must survive
    // untouched through the plain (shallow) UnNullish.
    type I1 = {
      a: { b: string | null } | null;
    };
    exact<
      UnNullish<I1>,
      {
        a: { b: string | null };
      }
    >(true);
  });

  it('UnNullish', () => {
    type unmodified = { a?: number | null; b: string | null; c: null };
    type I1 = {
      a1: boolean | null;
      a2?: string | null;
      a3: unmodified | null;
      a4?: unmodified[] | null;
      a5?: Map<string, unmodified> | null;
      a6?: Type<unmodified> | null;
      a7: number | undefined | null;
      readonly a8: number | null;
      n: never | null;
      m?: never | null;
      readonly c?: unmodified[] | null;
    };

    exact<
      UnNullish<I1>,
      {
        a1: boolean;
        a2?: string;
        a3: unmodified;
        a4?: unmodified[];
        a5?: Map<string, unmodified>;
        a6?: Type<unmodified>;
        a7: number;
        readonly a8: number;
        readonly c?: unmodified[];
      }
    >(true);
  });

  it('DeepUnNullish', () => {
    type unmodified = { a?: number | null; b: string | null; c: null };
    type modified = { a?: number; b: string };
    type I1 = {
      a1: boolean | null;
      a2?: string | null;
      a3: unmodified | null;
      a4?: unmodified[] | null;
      a5?: Map<string, unmodified> | null;
      a6?: Type<unmodified> | null;
      a7: number | undefined | null;
      readonly a8: number | null;
      n: never | null;
      m?: never | null;
      readonly c?: unmodified[] | null;
    };

    exact<
      DeepUnNullish<I1>,
      {
        a1: boolean;
        a2?: string;
        a3: modified;
        a4?: unmodified[];
        a5?: Map<string, unmodified>;
        a6?: Type<unmodified>;
        a7: number;
        readonly a8: number;
        readonly c?: unmodified[];
      }
    >(true);
  });

  it('DeepUnNullish leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags: readonly string[] | null };
    exact<DeepUnNullish<I1>, { tags: readonly string[] }>(true);
  });

  it('DeeperUnNullish', () => {
    type unmodified = { a?: number | null; b: string | null; c: null };
    type modified = { a?: number; b: string };
    type I1 = {
      a1: boolean | null;
      a2?: string | null;
      a3: unmodified | null;
      a4?: unmodified[] | null;
      a5?: Map<string, unmodified> | null;
      a6?: Type<unmodified> | null;
      a7: number | undefined | null;
      readonly a8: number | null;
      n: never | null;
      m?: never | null;
      readonly c?: unmodified[] | null;
    };

    exact<
      DeeperUnNullish<I1>,
      {
        a1: boolean;
        a2?: string;
        a3: modified;
        a4?: modified[];
        a5?: Map<string, unmodified>;
        a6?: Type<unmodified>;
        a7: number;
        readonly a8: number;
        readonly c?: modified[];
      }
    >(true);
  });

  it('DeeperUnNullish recognizes a readonly array and preserves its mutability', () => {
    // DeeperUnNullish only strips null/undefined - it has nothing to do
    // with mutability, so a readonly array stays readonly.
    type I1 = { tags: readonly string[] | null };
    exact<DeeperUnNullish<I1>, { tags: readonly string[] }>(true);
  });

  it('DeeperUnNullish preserves tuples', () => {
    type I1 = {
      a: [string, number] | null;
    };
    exact<
      DeeperUnNullish<I1>,
      {
        a: [string, number];
      }
    >(true);
  });
});
