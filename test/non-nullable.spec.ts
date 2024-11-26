import { DeeperNonNullable, DeepNonNullable, Type } from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('NonNullable', () => {
  test('DeepNonNullable', () => {
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
      DeepNonNullable<I1>,
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

  test('DeeperNonNullable', () => {
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
      DeeperNonNullable<I1>,
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
});
