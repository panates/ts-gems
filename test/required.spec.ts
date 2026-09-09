import type {
  DeeperOmitRequired,
  DeeperPickRequired,
  DeeperRequired,
  DeepOmitRequired,
  DeepPickRequired,
  DeepRequired,
  OmitRequired,
  PickRequired,
  RequiredSome,
  Type,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('DeepRequired', () => {
  it('RequiredSome', () => {
    type I1 = {
      a?: number;
      readonly b?: string;
      readonly c?: string;
    };

    exact<
      RequiredSome<I1, 'a' | 'b'>,
      {
        a: number;
        readonly b: string;
        readonly c?: string;
      }
    >(true);
  });

  it('DeepRequired', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        readonly b: number;
      };
      readonly c: { readonly a: string }[];
      readonly n: never;
      readonly m?: never;
    };
    exact<
      DeepRequired<I1>,
      {
        a: number;
        b: {
          a: string;
          readonly b: number;
        };
        readonly c: { readonly a: string }[];
      }
    >(true);
  });

  it('DeepRequired leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags?: readonly string[] };
    exact<DeepRequired<I1>, { tags: readonly string[] }>(true);
  });

  it('DeeperRequired', () => {
    type I1 = {
      a?: number;
      b: {
        a?: string;
        readonly b: number;
      };
      readonly c: {
        readonly a: string;
        readonly n: never;
        readonly m?: never;
      }[];
    };
    exact<
      DeeperRequired<I1>,
      {
        a: number;
        b: {
          a: string;
          readonly b: number;
        };
        readonly c: { readonly a: string }[];
      }
    >(true);
  });

  it('DeeperRequired makes a readonly array property fully mutable', () => {
    type I1 = { tags?: readonly string[] };
    exact<DeeperRequired<I1>, { tags: string[] }>(true);
  });

  it('DeeperRequired keeps array-awareness through nested objects', () => {
    // Regression test: the object branch must recurse via DeeperRequired
    // (not fall back to the non-array-aware DeepRequired), otherwise an
    // array nested one level deeper silently stops being deep-processed.
    type I1 = {
      a?: {
        b?: { c?: number }[];
      };
    };
    exact<
      DeeperRequired<I1>,
      {
        a: {
          b: { c: number }[];
        };
      }
    >(true);
  });

  it('DeeperRequired preserves tuples', () => {
    type I1 = {
      a: [{ c?: number }, string];
    };
    exact<
      DeeperRequired<I1>,
      {
        a: [{ c?: number }, string];
      }
    >(true);
  });

  it('PickRequired', () => {
    type unmodified = { a: number; b?: string };
    type I1 = {
      a?: number;
      b: string;
      c: unmodified;
      d?: unmodified;
      e: unmodified[];
      f?: unmodified[];
      i: any;
      j?: any;
    };
    exact<
      PickRequired<I1>,
      {
        b: string;
        c: unmodified;
        e: unmodified[];
        i: any;
      }
    >(true);
  });

  it('OmitRequired', () => {
    type unmodified = { a: number; b?: string };
    type I1 = {
      a?: number;
      b: string;
      c: unmodified;
      d?: unmodified;
      e: unmodified[];
      f?: unmodified[];
      i: any;
      j?: any;
    };
    exact<
      OmitRequired<I1>,
      {
        a?: number;
        d?: unmodified;
        f?: unmodified[];
        j?: any;
      }
    >(true);
  });

  it('DeepPickRequired', () => {
    type unmodified = { a: number; b?: string };
    type modified = { a: number };
    type I1 = {
      a: {
        a1: boolean;
        a2: unmodified;
        a3: unmodified[];
        a4: Map<string, unmodified>;
        a5: WeakMap<any, unmodified>;
        a6: Set<unmodified>;
        a7: WeakSet<unmodified>;
        a8: Type<unmodified>;
        a9?: number;
        n: never;
        m?: never;
      };
      b?: string;
      c: { a: string; b?: number }[];
      n: never;
      m?: never;
    };
    exact<
      DeepPickRequired<I1>,
      {
        a: {
          a1: boolean;
          a2: modified;
          a3: unmodified[];
          a4: Map<string, unmodified>;
          a5: WeakMap<any, unmodified>;
          a6: Set<unmodified>;
          a7: WeakSet<unmodified>;
          a8: Type<unmodified>;
        };
        c: { a: string; b?: number }[];
      }
    >(true);
  });

  it('DeepOmitRequired', () => {
    type unmodified = { a: number; b?: string };
    type modified = { b?: string };
    type I1 = {
      a?: {
        a1?: boolean;
        a2?: unmodified;
        a3?: unmodified[];
        a4?: Map<string, unmodified>;
        a5?: WeakMap<any, unmodified>;
        a6?: Set<unmodified>;
        a7?: WeakSet<unmodified>;
        a8?: Type<unmodified>;
        a9: number;
        n: never;
        m?: never;
      };
      b: string;
      c?: unmodified[];
      n: never;
      m?: never;
    };
    exact<
      DeepOmitRequired<I1>,
      {
        a?: {
          a1?: boolean;
          a2?: modified;
          a3?: unmodified[];
          a4?: Map<string, unmodified>;
          a5?: WeakMap<any, unmodified>;
          a6?: Set<unmodified>;
          a7?: WeakSet<unmodified>;
          a8?: Type<unmodified>;
        };
        c?: unmodified[];
      }
    >(true);
  });

  it('DeeperPickRequired', () => {
    type unmodified = { a: number; b?: string };
    type modified = { a: number };
    type I1 = {
      a: {
        a1: boolean;
        a2: unmodified;
        a4: Map<string, unmodified>;
        a5: Type<unmodified>;
        a6?: number;
        n: never;
        m?: never;
      };
      b?: string;
      c: {
        a: string;
        b?: number;
        n: never;
        m?: never;
      }[];
    };
    exact<
      DeeperPickRequired<I1>,
      {
        a: {
          a1: boolean;
          a2: modified;
          a4: Map<string, unmodified>;
          a5: Type<unmodified>;
        };
        c: { a: string }[];
      }
    >(true);
  });

  it('DeeperPickRequired preserves tuples', () => {
    type I1 = {
      a: [string, number];
      b?: string;
    };
    exact<
      DeeperPickRequired<I1>,
      {
        a: [string, number];
      }
    >(true);
  });

  it('DeeperOmitRequired', () => {
    type unmodified = { a: number; b?: string };
    type modified = { b?: string };
    type I1 = {
      a?: {
        a1?: boolean;
        a2?: unmodified;
        a3?: unmodified[];
        a4?: Map<string, unmodified>;
        a5?: WeakMap<any, unmodified>;
        a6?: Set<unmodified>;
        a7?: WeakSet<unmodified>;
        a8?: Type<unmodified>;
        a9: number;
        n: never;
        m?: never;
      };
      b: string;
      c?: unmodified[];
      n: never;
      m?: never;
    };
    exact<
      DeeperOmitRequired<I1>,
      {
        a?: {
          a1?: boolean;
          a2?: modified;
          a3?: modified[];
          a4?: Map<string, unmodified>;
          a5?: WeakMap<any, unmodified>;
          a6?: Set<unmodified>;
          a7?: WeakSet<unmodified>;
          a8?: Type<unmodified>;
        };
        c?: modified[];
      }
    >(true);
  });

  it('DeeperOmitRequired preserves tuples', () => {
    type I1 = {
      a?: [string, number];
      b: string;
    };
    exact<
      DeeperOmitRequired<I1>,
      {
        a?: [string, number];
      }
    >(true);
  });
});
