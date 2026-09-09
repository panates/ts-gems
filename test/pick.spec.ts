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
      c: never;
    };
    exact<
      StrictPick<I1, 'a' | 'c'>,
      {
        a?: number;
      }
    >(true);
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
