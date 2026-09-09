import type { Combine } from '../lib/index.js';
import { exact } from './_support/asserts.js';

describe('Combine', () => {
  it('Combine', () => {
    type I1 = {
      a: string;
      b: boolean;
      c?: number;
    };

    type I2 = {
      b: string;
      d?: Function;
    };

    type I3 = {
      b: Date;
      e?: boolean;
    };

    exact<
      Combine<I1, I2>,
      {
        a: string;
        b: boolean;
        c?: number;
        d?: Function;
      }
    >(true);

    exact<
      Combine<I1, I2, I3>,
      {
        a: string;
        b: boolean;
        c?: number;
        d?: Function;
        e?: boolean;
      }
    >(true);

    type I4 = {
      e: number;
      f: string;
    };

    exact<
      Combine<I1, I2, I3, I4>,
      {
        a: string;
        b: boolean;
        c?: number;
        d?: Function;
        e?: boolean;
        f: string;
      }
    >(true);
  });

  it('Combine gives earlier arguments precedence on overlapping keys', () => {
    type I1 = { a: string };
    type I2 = { a: number };
    exact<Combine<I1, I2>, { a: string }>(true);
  });
});
