import {exact} from './_support/asserts';
import {
  DeepPickJson, DeepPickOptional, DeepPickReadonly, DeepPickRequired, DeepPickWritable,
  StrictDeepPickOptional,
  StrictDeepPickReadonly,
  StrictDeepPickRequired,
  StrictDeepPickWritable, Type,
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
    }>(true);
  });

  test('StrictDeepPickOptional', () => {
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
    }
    exact<StrictDeepPickOptional<I1>, {
      a?: {
        a1?: boolean,
        a2?: Modified,
        a3?: Modified[],
        a4?: Map<string, Modified>,
        a5?: WeakMap<any, Modified>,
        a6?: Set<Modified>,
        a7?: WeakSet<Modified>,
        a8?: Type<Unmodified>,
      };
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
    }>(true);
  });

  test('StrictDeepPickRequired', () => {
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
    }
    exact<StrictDeepPickRequired<I1>, {
      a: {
        a1: boolean,
        a2: Modified,
        a3: Modified[],
        a4: Map<string, Modified>,
        a5: WeakMap<any, Modified>,
        a6: Set<Modified>,
        a7: WeakSet<Modified>,
        a8: Type<Unmodified>,
      };
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
    }>(true);
  });

  test('StrictDeepPickReadonly', () => {
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
    }
    exact<StrictDeepPickReadonly<I1>, {
      readonly a: {
        readonly a1: boolean,
        readonly a2: Modified,
        readonly a3: Modified[],
        readonly a4: Map<string, Modified>,
        readonly a5: WeakMap<any, Modified>,
        readonly a6: Set<Modified>,
        readonly a7: WeakSet<Modified>,
        readonly a8: Type<Unmodified>,
      };
    }>(true);
  });

  test('DeepPickWritable', () => {
    type Unmodified = { a: number, readonly b: string };
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
        readonly a9: number
      };
      readonly b: string;
    }
    exact<DeepPickWritable<I1>, {
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
    }>(true);
  });

  test('StrictDeepPickWritable', () => {
    type Unmodified = { a: number, readonly b: string };
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
        readonly a9: number
      };
      readonly b: string;
    }
    exact<StrictDeepPickWritable<I1>, {
      a: {
        a1: boolean,
        a2: Modified,
        a3: Modified[],
        a4: Map<string, Modified>,
        a5: WeakMap<any, Modified>,
        a6: Set<Modified>,
        a7: WeakSet<Modified>,
        a8: Type<Unmodified>,
      };
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
