import { exact } from './_support/asserts';
import { DeepNullish, DeeperNullish, Type } from '../lib';

describe('DeepNullish', function () {

  test('DeepNullish', () => {
    type unmodified = { a?: number, b: string };
    type modified = { a?: number | null, b?: string | null };
    type I1 = {
      a?: {
        a1: boolean,
        a2: unmodified,
        a3?: unmodified[],
        a4?: Map<string, unmodified>,
        a5?: Type<unmodified>,
        a6: number | undefined;
        readonly a7: number;
        n: never;
        m?: never;
      };
      b: string;
      readonly c?: unmodified[];
      n?: never
    }

    exact<DeepNullish<I1>, {
      a?: {
        a1?: boolean | null,
        a2?: modified | null,
        a3?: unmodified[] | null,
        a4?: Map<string, unmodified> | null,
        a5?: Type<unmodified> | null,
        a6?: number | null;
        readonly a7?: number | null;
      } | null;
      b?: string | null;
      readonly c?: unmodified[] | null;
    }>(true);
  });

  test('DeeperNullish', () => {
    type unmodified = { a?: number, b: string };
    type modified = { a?: number | null, b?: string | null };
    type I1 = {
      a?: {
        a1: boolean,
        a2: unmodified,
        a3?: unmodified[],
        a4?: Map<string, unmodified>,
        a5?: Type<unmodified>,
        a6: number | undefined;
        readonly a7: number;
        n: never;
        m?: never;
      };
      b: string;
      readonly c?: unmodified[];
      n?: never
    }

    exact<DeeperNullish<I1>, {
      a?: {
        a1?: boolean | null,
        a2?: modified | null,
        a3?: modified[] | null,
        a4?: Map<string, unmodified> | null,
        a5?: Type<unmodified> | null,
        a6?: number | null;
        readonly a7?: number | null;
      } | null;
      b?: string | null;
      readonly c?: modified[] | null;
    }>(true);
  });


});
