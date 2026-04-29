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
});
