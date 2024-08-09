import { DeeperOmitNever, DeepOmitNever, OmitNever } from '../lib/index.js';
import { exact } from './_support/asserts';

describe('OmitNever', () => {
  test('OmitNever', () => {
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

  test('DeepOmitNever', () => {
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

  test('HighDeepOmitNever', () => {
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
});
