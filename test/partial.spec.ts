import { exact } from './_support/asserts';
import { DeepPartial, DeeperPartial, Type, PartialSome } from '../lib';

describe('DeepPartial', function () {

  test('PartialSome', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: string;
    }

    exact<PartialSome<I1, 'a' | 'b'>, {
      a?: number;
      readonly b?: string;
      readonly c: string;
    }>(true);
  });

  test('DeepPartial', () => {
    type unmodified = { a?: number, b: string };
    type modified = { a?: number, b?: string };
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

    exact<DeepPartial<I1>, {
      a?: {
        a1?: boolean,
        a2?: modified,
        a3?: unmodified[],
        a4?: Map<string, unmodified>,
        a5?: Type<unmodified>,
        a6?: number;
        readonly a7?: number;
      };
      b?: string;
      readonly c?: unmodified[];
    }>(true);
  });

  test('DeeperPartial', () => {
    type unmodified = { a?: number, b: string };
    type modified = { a?: number, b?: string };
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

    exact<DeeperPartial<I1>, {
      a?: {
        a1?: boolean,
        a2?: modified,
        a3?: modified[],
        a4?: Map<string, unmodified>,
        a5?: Type<unmodified>,
        a6?: number;
        readonly a7?: number;
      };
      b?: string;
      readonly c?: modified[];
    }>(true);
  });

});
