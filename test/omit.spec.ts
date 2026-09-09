import type {
  DeeperOmitTypes,
  DeepOmitTypes,
  OmitFunctions,
  OmitTypes,
  StrictOmit,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Omit', () => {
  it('StrictOmit', () => {
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

  it('StrictOmit drops never-typed keys, consistent with StrictPick', () => {
    type I1 = {
      a?: number;
      b: string;
      c: never;
    };
    exact<
      StrictOmit<I1, 'b'>,
      {
        a?: number;
      }
    >(true);
  });

  it('OmitFunctions', () => {
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

  it('OmitTypes', () => {
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
      }
    >(true);

    exact<
      OmitTypes<I1, number | boolean>,
      {
        c: {};
        h: any;
        i: unknown;
        j: string;
        k: () => void;
      }
    >(true);
    exact<
      OmitTypes<I1, null>,
      {
        a: number;
        c: {};
        d: boolean;
        h: any;
        i: unknown;
        j: string | number | boolean;
        k: () => void;
      }
    >(true);
  });

  it('DeepOmitTypes', () => {
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

  it('DeepOmitTypes leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    interface I1 {
      tags: readonly string[];
    }
    exact<DeepOmitTypes<I1, boolean>, { tags: readonly string[] }>(true);
  });

  it('DeeperOmitTypes', () => {
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

  it('DeeperOmitTypes makes a readonly array property fully mutable', () => {
    interface I1 {
      tags: readonly string[];
    }
    exact<DeeperOmitTypes<I1, boolean>, { tags: string[] }>(true);
  });

  it('DeeperOmitTypes preserves tuples', () => {
    interface I1 {
      a: [string, number];
    }
    exact<
      DeeperOmitTypes<I1, boolean>,
      {
        a: [string, number];
      }
    >(true);
  });
});
