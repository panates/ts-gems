import {
  DeeperOmitTypes,
  DeepOmitTypes,
  OmitFunctions,
  OmitTypes,
  StrictOmit,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Omit', () => {
  test('StrictOmit', () => {
    type I1 = {
      a?: number;
      b: string;
    };
    exact<
      StrictOmit<I1, 'b'>,
      {
        a?: number;
      }
    >(true);
  });

  test('OmitFunctions', () => {
    class TestClass {}

    type I1 = {
      a1?: number;
      a2: string;
      a3: () => boolean;
      a4: () => boolean;
      a5: TestClass;
      n: never;
      m?: never;
    };
    exact<
      OmitFunctions<I1>,
      {
        a1?: number;
        a2: string;
        a5: TestClass;
      }
    >(true);
  });

  test('OmitTypes', () => {
    interface I1 {
      a: number;
      b: undefined;
      c: {};
      d: boolean;
      f: never;
      h: any;
      i: unknown;
      j: string | number | boolean;
      k: () => void;
      l: null;
    }

    exact<
      OmitTypes<I1, number>,
      {
        c: {};
        d: boolean;
        h: any;
        i: unknown;
        j: string | boolean;
        k: () => void;
        l: null;
      }
    >(true);
  });

  test('DeepOmitTypes', () => {
    type unmodified = { a?: number; b: string; c: string | number | boolean };
    type modified = { b: string; c: string | boolean };

    interface I1 {
      a1: number;
      a2: unmodified;
      a3?: unmodified[];
    }

    exact<
      DeepOmitTypes<I1, number>,
      {
        a2: modified;
        a3?: unmodified[];
      }
    >(true);
  });

  test('DeeperOmitTypes', () => {
    type unmodified = { a?: number; b: string; c: string | number | boolean };
    type modified = { b: string; c: string | boolean };

    interface I1 {
      a1: number;
      a2: unmodified;
      a3?: unmodified[];
    }

    exact<
      DeeperOmitTypes<I1, number>,
      {
        a2: modified;
        a3?: modified[];
      }
    >(true);
  });
});
