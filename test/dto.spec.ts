import type { DTO } from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('DTO', () => {
  it('DTO - 1', () => {
    type I1 = {
      a: string;
      b: Function;
      c: symbol;
      d?: number;
    };
    exact<
      DTO<I1>,
      {
        a: string;
        d?: number;
      }
    >(true);
  });

  it('DTO - 2', () => {
    type I1 = {
      a: string;
      b?: boolean;
    };
    exact<
      DTO<I1, number>,
      {
        a: string | number;
        b?: boolean | number;
      }
    >(true);
  });

  it('DTO removes symbol keys', () => {
    const sym = Symbol('x');
    type I1 = {
      a: string;
      [sym]: string;
    };
    exact<
      DTO<I1>,
      {
        a: string;
      }
    >(true);
  });

  it('DTO preserves tuples', () => {
    type I1 = {
      a: [string, number];
    };
    exact<
      DTO<I1>,
      {
        a: [string, number];
      }
    >(true);
  });

  it('DTO deep-processes nested objects and arrays', () => {
    type unmodified = { a: string; b: Function };
    type modified = { a: string };
    type I1 = {
      a: unmodified;
      b: unmodified[];
    };
    exact<
      DTO<I1>,
      {
        a: modified;
        b: modified[];
      }
    >(true);
  });
});
