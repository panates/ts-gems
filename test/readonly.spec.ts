import { exact } from './_support/asserts';
import {
  DeepPickReadonly, DeepReadonly, DeeperPickReadonly,
  DeeperReadonly, OmitReadonly, PickReadonly, ReadonlyKeys,
  Type, DeepOmitReadonly, DeeperOmitReadonly, ReadonlySome
} from '../lib';

describe('Readonly', function () {

  test('ReadonlySome', () => {
    type I1 = {
      a?: number;
      b: string;
      c: string;
    }

    exact<ReadonlySome<I1, 'a' | 'b'>, {
      readonly a?: number;
      readonly b: string;
      c: string;
    }>(true);
  });

  test('DeepReadonly', () => {
    type unmodified = { a?: number, b: number };
    type modified = { readonly a?: number, readonly b: number };
    type I1 = {
      a?: number;
      b: unmodified;
      c: unmodified[],
      n: never;
      m?: never;
    }
    exact<DeepReadonly<I1>, {
      readonly a?: number;
      readonly b: modified;
      readonly c: unmodified[];
    }>(true);
  });

  test('DeeperReadonly', () => {
    type unmodified = { a?: number, b: number };
    type modified = { readonly a?: number, readonly b: number };
    type I1 = {
      a?: number;
      b: unmodified;
      c: unmodified[],
      n: never;
      m?: never;
    }
    exact<DeeperReadonly<I1>, {
      readonly a?: number;
      readonly b: modified;
      readonly c: modified[];
    }>(true);

  });

  test('ReadonlyKeys', () => {
    type I1 = { readonly a: number; b?: undefined };
    exact<ReadonlyKeys<I1>, 'a'>(true);
  });

  test('PickReadonly', () => {
    const sym = Symbol('x');
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: {
        a: string;
        readonly b: number
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      e: { a?: string; b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
      i: any;
      readonly j?: any;
      k: typeof sym
    }
    exact<PickReadonly<I1>, {
      readonly b: string;
      readonly c: {
        a: string;
        readonly b: number
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      readonly f?: { readonly a?: string; b: number }[];
      readonly h: () => void;
      readonly j?: any;
    }>(true);
  });

  test('OmitReadonly', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: {
        a: string;
        readonly b: number;
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      e: { a?: string; readonly b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
      i: any;
      readonly j?: any;
    }
    exact<OmitReadonly<I1>, {
      a: number;
      e: { a?: string; readonly b: number }[];
      g: () => void;
      i: any;
    }>(true);
  });

  test('DeepPickReadonly', () => {
    type unmodified = { readonly a: number, b: string };
    type modified = { readonly a: number };
    type I1 = {
      readonly a: {
        readonly a1: boolean,
        readonly a2: unmodified,
        readonly a3: unmodified[],
        readonly a4: Map<string, unmodified>,
        readonly a5: WeakMap<any, unmodified>,
        readonly a6: Set<unmodified>,
        readonly a7: WeakSet<unmodified>,
        readonly a8: Type<unmodified>,
        a9: number
      };
      b: string;
      readonly c: { readonly a: string, b?: number }[];
      readonly n: never;
      readonly m?: never;
    }
    exact<DeepPickReadonly<I1>, {
      readonly a: {
        readonly a1: boolean,
        readonly a2: modified,
        readonly a3: unmodified[],
        readonly a4: Map<string, unmodified>,
        readonly a5: WeakMap<any, unmodified>,
        readonly a6: Set<unmodified>,
        readonly a7: WeakSet<unmodified>,
        readonly a8: Type<unmodified>,
      };
      readonly c: { readonly a: string, b?: number }[]
    }>(true);
  });

  test('DeeperPickReadonly', () => {
    type unmodified = { readonly a: number, b: string };
    type modified = { readonly a: number };
    type I1 = {
      readonly a: {
        readonly a1: boolean,
        readonly a2: unmodified,
        readonly a3: Map<string, unmodified>,
        readonly a4: Type<unmodified>,
        a9: number
      };
      b: string;
      readonly c: {
        readonly a: string,
        b?: number;
        readonly n: never;
        readonly m?: never;
      }[]
    }
    exact<DeeperPickReadonly<I1>, {
      readonly a: {
        readonly a1: boolean,
        readonly a2: modified,
        readonly a3: Map<string, unmodified>,
        readonly a4: Type<unmodified>,
      };
      readonly c: { readonly a: string }[]
    }>(true);
  });

  test('DeepOmitReadonly', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: {
        a: string;
        readonly b: number;
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      e: { a?: string; readonly b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
      n: never;
    }
    exact<DeepOmitReadonly<I1>, {
      a: number;
      e: { a?: string; readonly b: number }[];
      g: () => void;
    }>(true);
  });

  test('DeeperOmitReadonly', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: {
        a: string;
        readonly b: number;
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      e: { a?: string; readonly b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
      n: never;
    }
    exact<DeeperOmitReadonly<I1>, {
      a: number;
      e: { a?: string }[];
      g: () => void;
    }>(true);
  });


});
