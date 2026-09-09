import type {
  DeeperOmitReadonly,
  DeeperPickReadonly,
  DeeperReadonly,
  DeepOmitReadonly,
  DeepPickReadonly,
  DeepReadonly,
  OmitReadonly,
  PickReadonly,
  ReadonlyKeys,
  ReadonlySome,
  Type,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Readonly', () => {
  it('ReadonlySome', () => {
    type I1 = {
      a?: number;
      b: string;
      c: string;
    };

    exact<
      ReadonlySome<I1, 'a' | 'b'>,
      {
        readonly a?: number;
        readonly b: string;
        c: string;
      }
    >(true);
  });

  it('DeepReadonly', () => {
    type unmodified = { a?: number; b: number };
    type modified = { readonly a?: number; readonly b: number };
    type I1 = {
      a?: number;
      b: unmodified;
      c: unmodified[];
      n: never;
      m?: never;
    };
    exact<
      DeepReadonly<I1>,
      {
        readonly a?: number;
        readonly b: modified;
        readonly c: unmodified[];
      }
    >(true);
  });

  it('DeepReadonly leaves a readonly array property untouched', () => {
    // Regression test: a `readonly T[]` value must be recognized as a leaf,
    // the same as a plain `T[]`, instead of being torn apart into an
    // Array.prototype-shaped object.
    type I1 = { tags: readonly string[] };
    exact<DeepReadonly<I1>, { readonly tags: readonly string[] }>(true);
  });

  it('DeepReadonly preserves a `| null` member on nested objects', () => {
    // Regression test: recursing with NonNullable<T[K]> instead of
    // Exclude<T[K], undefined> silently drops `null` from the result.
    type Inner = { b: number };
    type I1 = { a: Inner | null };
    exact<DeepReadonly<I1>, { readonly a: { readonly b: number } | null }>(
      true,
    );
  });

  it('DeeperReadonly', () => {
    type unmodified = { a?: number; b: number };
    type modified = { readonly a?: number; readonly b: number };
    type I1 = {
      a?: number;
      b: unmodified;
      c: unmodified[];
      d: [unmodified, number];
      n: never;
      m?: never;
    };
    exact<
      DeeperReadonly<I1>,
      {
        readonly a?: number;
        readonly b: modified;
        readonly c: readonly modified[];
        readonly d: readonly [modified, number];
      }
    >(true);
  });

  it('DeeperReadonly makes an array/tuple readonly, whether or not the input already was', () => {
    // DeeperReadonly's whole purpose is to make everything readonly, so the
    // array/tuple wrapper itself becomes readonly too - regardless of
    // whether the source property was already `readonly T[]` or a plain
    // mutable `T[]`. This differs from families like Required/Partial/DTO,
    // which have nothing to do with mutability and so preserve whatever
    // wrapper mutability the input had instead of forcing one.
    type I1 = { tags: readonly string[]; list: string[] };
    exact<
      DeeperReadonly<I1>,
      { readonly tags: readonly string[]; readonly list: readonly string[] }
    >(true);
  });

  it('DeeperReadonly preserves a `| null` member on nested objects and arrays', () => {
    type Inner = { b: number };
    type I1 = { a: Inner | null; c: Inner[] | null };
    exact<
      DeeperReadonly<I1>,
      {
        readonly a: { readonly b: number } | null;
        readonly c: readonly { readonly b: number }[] | null;
      }
    >(true);
  });

  it('ReadonlyKeys', () => {
    type I1 = { readonly a: number; b?: undefined };
    exact<ReadonlyKeys<I1>, 'a'>(true);
  });

  it('PickReadonly', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sym = Symbol('x');
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
      e: { a?: string; b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
      i: any;
      readonly j?: any;
      k: typeof sym;
    };
    exact<
      PickReadonly<I1>,
      {
        readonly b: string;
        readonly c: {
          a: string;
          readonly b: number;
        };
        readonly d?: {
          readonly a?: string;
          b: number;
        };
        readonly f?: { readonly a?: string; b: number }[];
        readonly h: () => void;
        readonly j?: any;
      }
    >(true);
  });

  it('OmitReadonly', () => {
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
    };
    exact<
      OmitReadonly<I1>,
      {
        a: number;
        e: { a?: string; readonly b: number }[];
        g: () => void;
        i: any;
      }
    >(true);
  });

  it('DeepPickReadonly', () => {
    type unmodified = { readonly a: number; b: string };
    type modified = { readonly a: number };
    type I1 = {
      readonly a: {
        readonly a1: boolean;
        readonly a2: unmodified;
        readonly a3: unmodified[];
        readonly a4: Map<string, unmodified>;
        readonly a5: WeakMap<any, unmodified>;
        readonly a6: Set<unmodified>;
        readonly a7: WeakSet<unmodified>;
        readonly a8: Type<unmodified>;
        a9: number;
      };
      b: string;
      readonly c: { readonly a: string; b?: number }[];
      readonly n: never;
      readonly m?: never;
    };
    exact<
      DeepPickReadonly<I1>,
      {
        readonly a: {
          readonly a1: boolean;
          readonly a2: modified;
          readonly a3: unmodified[];
          readonly a4: Map<string, unmodified>;
          readonly a5: WeakMap<any, unmodified>;
          readonly a6: Set<unmodified>;
          readonly a7: WeakSet<unmodified>;
          readonly a8: Type<unmodified>;
        };
        readonly c: { readonly a: string; b?: number }[];
      }
    >(true);
  });

  it('DeepPickReadonly preserves a `| null` member on nested objects', () => {
    // Regression test: recursing with NonNullable<T[K]> instead of
    // Exclude<T[K], undefined> silently drops `null` from the result.
    type Inner = { readonly b: number; c: string };
    type I1 = { readonly a: Inner | null };
    exact<DeepPickReadonly<I1>, { readonly a: { readonly b: number } | null }>(
      true,
    );
  });

  it('DeeperPickReadonly', () => {
    type unmodified = { readonly a: number; b: string };
    type modified = { readonly a: number };
    type I1 = {
      readonly a: {
        readonly a1: boolean;
        readonly a2: unmodified;
        readonly a3: Map<string, unmodified>;
        readonly a4: Type<unmodified>;
        a9: number;
      };
      b: string;
      readonly c: {
        readonly a: string;
        b?: number;
        readonly n: never;
        readonly m?: never;
      }[];
    };
    exact<
      DeeperPickReadonly<I1>,
      {
        readonly a: {
          readonly a1: boolean;
          readonly a2: modified;
          readonly a3: Map<string, unmodified>;
          readonly a4: Type<unmodified>;
        };
        readonly c: { readonly a: string }[];
      }
    >(true);
  });

  it('DeeperPickReadonly preserves tuples', () => {
    type I1 = {
      readonly a: [string, number];
      b: string;
    };
    exact<
      DeeperPickReadonly<I1>,
      {
        readonly a: [string, number];
      }
    >(true);
  });

  it('DeeperPickReadonly preserves a `| null` member on nested objects and arrays', () => {
    type Inner = { readonly b: number; c: string };
    type I1 = { readonly a: Inner | null; readonly d: Inner[] | null };
    exact<
      DeeperPickReadonly<I1>,
      {
        readonly a: { readonly b: number } | null;
        readonly d: { readonly b: number }[] | null;
      }
    >(true);
  });

  it('DeepOmitReadonly', () => {
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
    };
    exact<
      DeepOmitReadonly<I1>,
      {
        a: number;
        e: { a?: string; readonly b: number }[];
        g: () => void;
      }
    >(true);
  });

  it('DeepOmitReadonly keeps mutable null-typed properties', () => {
    // Regression test: the never-key filter must not drop a mutable
    // property just because NonNullable<T[K]> is `never` (e.g. `null`).
    type I1 = {
      a: null;
      readonly b: null;
    };
    exact<
      DeepOmitReadonly<I1>,
      {
        a: null;
      }
    >(true);
  });

  it('DeepOmitReadonly preserves a `| null` member on nested objects', () => {
    // Regression test: recursing with NonNullable<T[K]> instead of
    // Exclude<T[K], undefined> silently drops `null` from the result.
    type Inner = { readonly b: number; c: string };
    type I1 = { a: Inner | null };
    exact<DeepOmitReadonly<I1>, { a: { c: string } | null }>(true);
  });

  it('DeeperOmitReadonly', () => {
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
    };
    exact<
      DeeperOmitReadonly<I1>,
      {
        a: number;
        e: { a?: string }[];
        g: () => void;
      }
    >(true);
  });

  it('DeeperOmitReadonly preserves tuples', () => {
    type I1 = {
      a: [string, number];
      readonly b: string;
    };
    exact<
      DeeperOmitReadonly<I1>,
      {
        a: [string, number];
      }
    >(true);
  });

  it('DeeperOmitReadonly preserves a `| null` member on nested objects and arrays', () => {
    type Inner = { readonly b: number; c: string };
    type I1 = { a: Inner | null; d: Inner[] | null };
    exact<
      DeeperOmitReadonly<I1>,
      { a: { c: string } | null; d: { c: string }[] | null }
    >(true);
  });
});
