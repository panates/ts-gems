import { exact } from './_support/asserts';
import {
  DeepPickJson,
  DeepPickOptional,
  DeepPickReadonly,
  DeepPickRequired,
  DeepPickWritable,
  HighDeepPickOptional,
  HighDeepPickReadonly,
  HighDeepPickRequired,
  HighDeepPickWritable,
  Type,
} from '../lib';

describe('DeepPick', function () {

  test('DeepPickOptional', () => {
    type Unmodified = { a?: number, b: string };
    type Modified = { a?: number };
    type I1 = {
      a?: {
        a1?: boolean,
        a2?: Unmodified,
        a3?: Unmodified[],
        a4?: Map<string, Unmodified>,
        a5?: WeakMap<any, Unmodified>,
        a6?: Set<Unmodified>,
        a7?: WeakSet<Unmodified>,
        a8?: Type<Unmodified>,
        a9: number
      };
      b: string;
      c?: { a: string, b?: number }[]
    }
    exact<DeepPickOptional<I1>, {
      a?: {
        a1?: boolean,
        a2?: Modified,
        a3?: Unmodified[],
        a4?: Map<string, Unmodified>,
        a5?: WeakMap<any, Unmodified>,
        a6?: Set<Unmodified>,
        a7?: WeakSet<Unmodified>,
        a8?: Type<Unmodified>,
      };
      c?: { a: string, b?: number }[]
    }>(true);
  });

  test('HighDeepPickOptional', () => {
    type Unmodified = { a?: number, b: string };
    type Modified = { a?: number };
    type I1 = {
      a?: {
        a1?: boolean,
        a2?: Unmodified,
        a4?: Map<string, Unmodified>,
        a5?: WeakMap<any, Unmodified>,
        a6?: Set<Unmodified>,
        a7?: WeakSet<Unmodified>,
        a8?: Type<Unmodified>,
        a9: number
      };
      b: string;
      c?: { a: string, b?: number }[]
    }
    exact<HighDeepPickOptional<I1>, {
      a?: {
        a1?: boolean,
        a2?: Modified,
        a4?: Map<string, Unmodified>,
        a5?: WeakMap<any, Unmodified>,
        a6?: Set<Unmodified>,
        a7?: WeakSet<Unmodified>,
        a8?: Type<Unmodified>,
      };
      c?: { b?: number }[]
    }>(true);

  });

  test('DeepPickRequired', () => {
    type Unmodified = { a: number, b?: string };
    type Modified = { a: number };
    type I1 = {
      a: {
        a1: boolean,
        a2: Unmodified,
        a3: Unmodified[],
        a4: Map<string, Unmodified>,
        a5: WeakMap<any, Unmodified>,
        a6: Set<Unmodified>,
        a7: WeakSet<Unmodified>,
        a8: Type<Unmodified>,
        a9?: number
      };
      b?: string;
      c: { a: string, b?: number }[]
    }
    exact<DeepPickRequired<I1>, {
      a: {
        a1: boolean,
        a2: Modified,
        a3: Unmodified[],
        a4: Map<string, Unmodified>,
        a5: WeakMap<any, Unmodified>,
        a6: Set<Unmodified>,
        a7: WeakSet<Unmodified>,
        a8: Type<Unmodified>,
      };
      c: { a: string, b?: number }[]
    }>(true);
  });

  test('HighDeepPickRequired', () => {
    type Unmodified = { a: number, b?: string };
    type Modified = { a: number };
    type I1 = {
      a: {
        a1: boolean,
        a2: Unmodified,
        a4: Map<string, Unmodified>,
        a5: WeakMap<any, Unmodified>,
        a6: Set<Unmodified>,
        a7: WeakSet<Unmodified>,
        a8: Type<Unmodified>,
        a9?: number
      };
      b?: string;
      c: { a: string, b?: number }[]
    }
    exact<HighDeepPickRequired<I1>, {
      a: {
        a1: boolean,
        a2: Modified,
        a4: Map<string, Unmodified>,
        a5: WeakMap<any, Unmodified>,
        a6: Set<Unmodified>,
        a7: WeakSet<Unmodified>,
        a8: Type<Unmodified>,
      };
      c: { a: string }[]
    }>(true);
  });

  test('DeepPickReadonly', () => {
    type Unmodified = { readonly a: number, b: string };
    type Modified = { readonly a: number };
    type I1 = {
      readonly a: {
        readonly a1: boolean,
        readonly a2: Unmodified,
        readonly a3: Unmodified[],
        readonly a4: Map<string, Unmodified>,
        readonly a5: WeakMap<any, Unmodified>,
        readonly a6: Set<Unmodified>,
        readonly a7: WeakSet<Unmodified>,
        readonly a8: Type<Unmodified>,
        a9: number
      };
      b: string;
      readonly c: { readonly a: string, b?: number }[]
    }
    exact<DeepPickReadonly<I1>, {
      readonly a: {
        readonly a1: boolean,
        readonly a2: Modified,
        readonly a3: Unmodified[],
        readonly a4: Map<string, Unmodified>,
        readonly a5: WeakMap<any, Unmodified>,
        readonly a6: Set<Unmodified>,
        readonly a7: WeakSet<Unmodified>,
        readonly a8: Type<Unmodified>,
      };
      readonly c: { readonly a: string, b?: number }[]
    }>(true);
  });

  test('HighDeepPickReadonly', () => {
    type Unmodified = { readonly a: number, b: string };
    type Modified = { readonly a: number };
    type I1 = {
      readonly a: {
        readonly a1: boolean,
        readonly a2: Unmodified,
        readonly a4: Map<string, Unmodified>,
        readonly a5: WeakMap<any, Unmodified>,
        readonly a6: Set<Unmodified>,
        readonly a7: WeakSet<Unmodified>,
        readonly a8: Type<Unmodified>,
        a9: number
      };
      b: string;
      readonly c: { readonly a: string, b?: number }[]
    }
    exact<HighDeepPickReadonly<I1>, {
      readonly a: {
        readonly a1: boolean,
        readonly a2: Modified,
        readonly a4: Map<string, Unmodified>,
        readonly a5: WeakMap<any, Unmodified>,
        readonly a6: Set<Unmodified>,
        readonly a7: WeakSet<Unmodified>,
        readonly a8: Type<Unmodified>,
      };
      readonly c: { readonly a: string }[]
    }>(true);
  });


  test('DeepPickWritable', () => {
    type Unmodified = { a: number, readonly b: string };
    type Modified = { a: number };
    type I1 = {
      a1?: boolean,
      a2?: Unmodified,
      a3?: Unmodified[],
      a4?: Map<string, Unmodified>,
      a5?: WeakMap<any, Unmodified>,
      a6?: Set<Unmodified>,
      a7?: WeakSet<Unmodified>,
      a8: Type<Unmodified>,
      readonly a9: number
      readonly b: string;
      c: { readonly a: string, b?: number }[]
    }
    exact<DeepPickWritable<I1>, {
      a1?: boolean,
      a2?: Modified,
      a3?: Unmodified[],
      a4?: Map<string, Unmodified>,
      a5?: WeakMap<any, Unmodified>,
      a6?: Set<Unmodified>,
      a7?: WeakSet<Unmodified>,
      a8: Type<Unmodified>,
      c: { readonly a: string, b?: number }[]
    }>(true);
  });

  test('HighDeepPickWritable', () => {
    type Unmodified = { a: number, readonly b: string };
    type Modified = { a: number };
    type I1 = {
      a: {
        a1: boolean,
        a2: Unmodified,
        a4: Map<string, Unmodified>,
        a5: WeakMap<any, Unmodified>,
        a6: Set<Unmodified>,
        a7: WeakSet<Unmodified>,
        a8: Type<Unmodified>,
        readonly a9: number
      };
      readonly b: string;
      c: { readonly a: string, b?: number }[]
    }
    exact<HighDeepPickWritable<I1>, {
      a: {
        a1: boolean,
        a2: Modified,
        a4: Map<string, Unmodified>,
        a5: WeakMap<any, Unmodified>,
        a6: Set<Unmodified>,
        a7: WeakSet<Unmodified>,
        a8: Type<Unmodified>,
      };
      c: { b?: number }[]
    }>(true);
  });

  test('DeepPickJson', () => {
    type I1 = {
      a?: number;
      b: string;
      c: {
        a?: string;
        b: () => void;
      };
      d: string[];
      e?: RegExp;
      f: Date;
      h: () => void
      k?: string | undefined,
      [Symbol.species]: number;
    }
    exact<DeepPickJson<I1>, {
      a?: number;
      b: string;
      c: { a?: string; };
      d: string[];
      e?: RegExp;
      f: Date;
      k?: string | undefined,
    }>(true);
  });

});
