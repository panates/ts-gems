import {
  DeeperNullish,
  DeepNullish,
  NullishObject,
  Type,
} from '../lib/index.js';
import { exact } from './_support/asserts';

describe('DeepNullish', () => {
  test('NullishObject', () => {
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

  test('DeepNullish', () => {
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

  test('DeeperNullish', () => {
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
});
