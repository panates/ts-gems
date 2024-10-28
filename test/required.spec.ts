import {
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
  test('RequiredSome', () => {
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

  test('DeepRequired', () => {
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

  test('DeeperRequired', () => {
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

  test('PickRequired', () => {
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

  test('OmitRequired', () => {
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

  test('DeepPickRequired', () => {
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

  test('DeepOmitRequired', () => {
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

  test('DeeperPickRequired', () => {
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

  test('DeeperOmitRequired', () => {
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
});
