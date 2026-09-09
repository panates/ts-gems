import type {
  DeeperOmitNever,
  DeepOmitNever,
  OmitNever,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('OmitNever', () => {
  it('OmitNever', () => {
    type I1 = {
      a?: number;
      b: string;
      c: never;
      d?: never;
    };
    exact<
      OmitNever<I1>,
      {
        a?: number;
        b: string;
      }
    >(true);
  });

  it('DeepOmitNever', () => {
    type I1 = {
      a?: number;
      b: string;
      b1: never;
      b2: never;
      c: {
        a?: string;
        b: number;
        b1: never;
        b2: never;
      };
      d?: {
        a?: string;
        b: number;
      };
      e: {
        a?: string;
        b: number;
        b1: never;
        b2: never;
      }[];
      f?: {
        a?: string;
        b: number;
        b1: never;
        b2: never;
      }[];
    };
    exact<
      DeepOmitNever<I1>,
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
          b1: never;
          b2: never;
        }[];
        f?: {
          a?: string;
          b: number;
          b1: never;
          b2: never;
        }[];
      }
    >(true);
  });

  it('DeepOmitNever leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags: readonly string[]; n: never };
    exact<DeepOmitNever<I1>, { tags: readonly string[] }>(true);
  });

  it('DeeperOmitNever', () => {
    type I1 = {
      a?: number;
      b: string;
      b1: never;
      b2: never;
      c: {
        a?: string;
        b: number;
        b1: never;
        b2: never;
      };
      d?: {
        a?: string;
        b: number;
      };
      e: {
        a?: string;
        b: number;
        b1: never;
        b2: never;
      }[];
      f?: {
        a?: string;
        b: number;
        b1: never;
        b2: never;
      }[];
    };
    exact<
      DeeperOmitNever<I1>,
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

  it('DeeperOmitNever makes a readonly array property fully mutable', () => {
    type I1 = { tags: readonly string[]; n: never };
    exact<DeeperOmitNever<I1>, { tags: string[] }>(true);
  });

  it('DeeperOmitNever preserves tuples', () => {
    type I1 = {
      a: [string, number];
      b: never;
    };
    exact<
      DeeperOmitNever<I1>,
      {
        a: [string, number];
      }
    >(true);
  });
});
