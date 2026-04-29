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
});
