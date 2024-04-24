import { exact } from './_support/asserts';
import { ValuesOf } from '../lib';

describe('Keys', function () {
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
