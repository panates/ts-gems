import { ValuesOf } from '../lib/index.js';
import { exact } from './_support/asserts';

describe('Keys', () => {
  test('ValuesOf', () => {
    type I1 = {
      a: number;
      b?: undefined;
      c?: {};
      d: undefined;
      e: null;
      f: never;
    };
    exact<ValuesOf<I1>, number | undefined | null | {}>(true);
  });
});
