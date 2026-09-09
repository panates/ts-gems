import type {
  DeeperOmitUndefined,
  DeepOmitUndefined,
  OmitUndefined,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('OmitUndefined', () => {
  it('OmitUndefined', () => {
    type I1 = {
      a?: number;
      b: string;
      c: undefined;
      d?: never;
    };
    exact<
      OmitUndefined<I1>,
      {
        a?: number;
        b: string;
      }
    >(true);
  });

  it('DeepOmitUndefined', () => {
    type I1 = {
      a?: number;
      b: string;
      b1: undefined;
      b2: never;
      c: {
        a?: string;
        b: number;
        b1: undefined;
        b2: never;
      };
      d?: {
        a?: string;
        b: number;
        c: undefined;
      };
      e: {
        a?: string;
        b: number;
        b1: undefined;
        b2: never;
      }[];
      f?: {
        a?: string;
        b: number;
        b1: undefined;
        b2: never;
      }[];
    };
    exact<
      DeepOmitUndefined<I1>,
      {
        a?: number;
        b: string;
        c: {
          a?: string;
          b: number;
        };
        d?: {
          a?: string;
          b: number;
        };
        e: {
          a?: string;
          b: number;
          b1: undefined;
          b2: never;
        }[];
        f?: {
          a?: string;
          b: number;
          b1: undefined;
          b2: never;
        }[];
      }
    >(true);
  });

  it('DeepOmitUndefined leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags: readonly string[]; b: undefined };
    exact<DeepOmitUndefined<I1>, { tags: readonly string[] }>(true);
  });

  it('DeepOmitUndefined preserves a `| null` member on nested objects', () => {
    type Inner = { a: string; b: undefined };
    type I1 = { x: Inner | null };
    exact<DeepOmitUndefined<I1>, { x: { a: string } | null }>(true);
  });

  it('DeeperOmitUndefined', () => {
    type I1 = {
      a?: number;
      b: string;
      b1: undefined;
      b2: never;
      c: {
        a?: string;
        b: number;
        b1: undefined;
        b2: never;
      };
      d?: {
        a?: string;
        b: number;
        c: undefined;
      };
      e: {
        a?: string;
        b: number;
        b1: undefined;
        b2: never;
      }[];
      f?: {
        a?: string;
        b: number;
        b1: undefined;
        b2: never;
      }[];
    };
    exact<
      DeeperOmitUndefined<I1>,
      {
        a?: number;
        b: string;
        c: {
          a?: string;
          b: number;
        };
        d?: {
          a?: string;
          b: number;
        };
        e: {
          a?: string;
          b: number;
        }[];
        f?: {
          a?: string;
          b: number;
        }[];
      }
    >(true);
  });

  it('DeeperOmitUndefined recognizes a readonly array and preserves its mutability', () => {
    type I1 = { tags: readonly string[]; b: undefined };
    exact<DeeperOmitUndefined<I1>, { tags: readonly string[] }>(true);
  });

  it('DeeperOmitUndefined preserves a `| null` member on nested objects and arrays', () => {
    type Inner = { a: string; b: undefined };
    type I1 = { x: Inner | null; y: Inner[] | null };
    exact<
      DeeperOmitUndefined<I1>,
      { x: { a: string } | null; y: { a: string }[] | null }
    >(true);
  });

  it('DeeperOmitUndefined preserves tuples', () => {
    type I1 = {
      a: [string, number];
      b: undefined;
    };
    exact<
      DeeperOmitUndefined<I1>,
      {
        a: [string, number];
      }
    >(true);
  });
});
