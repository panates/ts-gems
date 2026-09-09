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

  it('StrictOmit keeps never-typed keys untouched (only the named key is removed)', () => {
    // Regression test: StrictOmit must only remove properties named in `X`,
    // by K's identity, not by inspecting T[K]'s value type. An earlier
    // revision added an `IfNever<...>`-based filter to also drop
    // never-typed keys (matching StrictPick's never-key filter), but that
    // check on `T[K]` is evaluated even while `T` is still an unresolved
    // generic type parameter in a deferred context, which can make TS treat
    // an as-yet-unconstrained property as `never` and drop it prematurely -
    // this broke real generic call sites downstream. Keep this simple.
    type I1 = {
      a?: number;
      b: string;
      c: never;
    };
    exact<
      StrictOmit<I1, 'b'>,
      {
        a?: number;
        c: never;
      }
    >(true);
  });

  it('StrictOmit stays usable inside a generic method with an open T', () => {
    // Regression test: this is a compile-time check - it has nothing to
    // assert at runtime. If StrictOmit's key-remapping ever again depends
    // on T[K] (the value type) instead of only K (the key), this file
    // fails to compile with "Object literal may only specify known
    // properties, and 'filter' does not exist", because `T` is still an
    // open, uninstantiated generic parameter at the `useService` call site
    // below - this is the exact shape of a real regression found in a
    // downstream consumer (a generic MongoDB collection service passing a
    // `filter` object literal through a type built with StrictOmit).
    interface FindOneOptionsBase<T> {
      filter?: Partial<T>;
      projection?: string[];
    }

    type FindOneOptions<T> = StrictOmit<FindOneOptionsBase<T>, 'projection'>;

    class Service<T> {
      findOne(options: FindOneOptions<T>) {
        return options;
      }
    }

    function useService<T>(svc: Service<T>) {
      return svc.findOne({ filter: {} });
    }

    void useService;
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

  it('DeepOmitTypes preserves a `| null` member on nested objects', () => {
    // Regression test: recursing with NonNullable<T[K]> instead of
    // Exclude<T[K], undefined> silently drops `null` from the result.
    interface Inner {
      a: number;
      b: boolean;
    }
    interface I1 {
      x: Inner | null;
    }
    exact<DeepOmitTypes<I1, boolean>, { x: { a: number } | null }>(true);
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

  it('DeeperOmitTypes recognizes a readonly array and preserves its mutability', () => {
    interface I1 {
      tags: readonly string[];
    }
    exact<DeeperOmitTypes<I1, boolean>, { tags: readonly string[] }>(true);
  });

  it('DeeperOmitTypes preserves a `| null` member on nested objects and arrays', () => {
    interface Inner {
      a: number;
      b: boolean;
    }
    interface I1 {
      x: Inner | null;
      y: Inner[] | null;
    }
    exact<
      DeeperOmitTypes<I1, boolean>,
      { x: { a: number } | null; y: { a: number }[] | null }
    >(true);
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
