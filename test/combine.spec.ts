import { Combine } from '../lib/index.js';
import { exact } from './_support/asserts';

describe('Combine', () => {
  test('Combine', () => {
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
  });
});
