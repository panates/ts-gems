import { And, Or } from '../lib/index.js';
import { exact } from './_support/asserts';

describe('Logical', () => {
  test('And', () => {
    exact<And<true, true>, true>(true);
    exact<And<true, true, true, true>, true>(true);
    exact<And<true, false, true, true>, false>(true);
    exact<And<true, true, true, false>, false>(true);
    exact<And<true, never>, false>(true);
    exact<And<true, undefined>, false>(true);
    exact<And<true, null>, false>(true);
  });

  test('Or', () => {
    exact<Or<false, false>, false>(true);
    exact<Or<false, true>, true>(true);
    exact<Or<true, true, true, true>, true>(true);
    exact<Or<true, false, true, true>, true>(true);
    exact<Or<true, true, true, false>, true>(true);
    exact<Or<false, never>, false>(true);
    exact<Or<false, undefined>, false>(true);
    exact<Or<false, null>, false>(true);
  });
});
