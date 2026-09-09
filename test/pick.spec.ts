import type {
  FunctionKeys,
  KeysOfTypes,
  NonFunctionKeys,
  PickFunctions,
  PickOptional,
  PickTypes,
  StrictKeysOfTypes,
  StrictPick,
  StrictPickTypes,
} from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Pick', () => {
  it('StrictPick', () => {
    type I1 = {
      a?: number;
      b: string;
    };
    exact<
      StrictPick<I1, 'a'>,
      {
        a?: number;
      }
    >(true);
  });

  it('StrictPick keeps never-typed keys untouched (only the named keys are picked)', () => {
    // Regression test: StrictPick must only select properties named in `X`,
    // by K's identity, not by inspecting T[K]'s value type. An earlier
    // revision filtered out never-typed keys too (an `IfNever<...>` check
    // on `T[K]` in the key-remapping clause), but that check depends on
    // T[K], which TypeScript cannot resolve while `T` is still an open
    // generic type parameter - e.g. inside another generic method. In that
    // case TS drops the key from the mapped type's apparent shape entirely,
    // and an object literal argument then fails with "object literal may
    // only specify known properties", even though the property clearly
    // exists. Picking by name should never depend on the value's type.
    type I1 = {
      a?: number;
      b: string;
      c: never;
    };
    exact<
      StrictPick<I1, 'a' | 'c'>,
      {
        a?: number;
        c: never;
      }
    >(true);
  });

  it('StrictPick stays usable inside a generic method with an open T', () => {
    // Regression test: this is a compile-time check - it has nothing to
    // assert at runtime. If StrictPick's key-remapping ever again depends
    // on T[K] (the value type) instead of only K (the key), this file
    // fails to compile with "Object literal may only specify known
    // properties, and 'filter' does not exist", because `T` is still an
    // open, uninstantiated generic parameter at the `useService` call site
    // below - the exact shape of a real regression found in a downstream
    // consumer (a generic MongoDB collection service passing a `filter`
    // object literal through a type built with StrictPick).
    interface FindOneOptionsBase<T> {
      filter?: Partial<T>;
      projection?: string[];
    }

    type FindOneOptions<T> = StrictPick<FindOneOptionsBase<T>, 'filter'>;

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

  it('PickFunctions', () => {
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
      PickFunctions<I1>,
      {
        a3: () => boolean;
        a4: () => boolean;
      }
    >(true);
  });

  it('FunctionKeys', () => {
    type I1 = { a: string; b: () => void };
    exact<FunctionKeys<I1>, 'b'>(true);
  });

  it('NonFunctionKeys', () => {
    type I1 = { a: string; b: () => void };
    exact<NonFunctionKeys<I1>, 'a'>(true);
  });

  it('KeysOfTypes', () => {
    type I1 = { a: number; b: string; c: number };
    exact<KeysOfTypes<I1, number>, 'a' | 'c'>(true);
  });

  it('StrictKeysOfTypes', () => {
    type I1 = { a: number; b: string; c: unknown };
    exact<StrictKeysOfTypes<I1, number>, 'a'>(true);
  });

  it('PickOptional', () => {
    type I1 = {
      a?: number;
      b: string;
      c: {
        a?: string;
        b: number;
      };
      d?: {
        a?: string;
        b: number;
      };
      e: { a?: string; b: number }[];
      f?: { a?: string; b: number }[];
      i: any;
      j?: any;
    };
    exact<
      PickOptional<I1>,
      {
        a?: number;
        d?: {
          a?: string;
          b: number;
        };
        f?: { a?: string; b: number }[];
        j?: any;
      }
    >(true);
  });

  it('PickTypes', () => {
    interface I1 {
      a: number;
      b: undefined;
      c: {};
      d: boolean;
      e: null;
      f: never;
      h: any;
      i: unknown;
      j: string | number | boolean;
      k: () => void;
    }

    exact<
      PickTypes<I1, number>,
      {
        a: number;
        c: {};
        h: any;
        i: unknown;
        j: string | number | boolean;
      }
    >(true);

    exact<
      PickTypes<I1, string | boolean>,
      {
        c: {};
        d: boolean;
        h: any;
        i: unknown;
        j: string | number | boolean;
      }
    >(true);
  });

  it('StrictPickTypes', () => {
    interface I1 {
      a: number;
      b: undefined;
      c: {};
      d: boolean;
      e: null;
      f: never;
      h: any;
      i: unknown;
      j: string | number | boolean;
      k: () => void;
      l: string;
    }

    exact<
      StrictPickTypes<I1, number>,
      {
        a: number;
        j: string | number | boolean;
      }
    >(true);

    exact<
      StrictPickTypes<I1, string | boolean>,
      {
        d: boolean;
        j: string | number | boolean;
        l: string;
      }
    >(true);
  });
});
