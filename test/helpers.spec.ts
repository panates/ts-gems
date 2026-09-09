import type { IfNoDeepValue, ValuesOf } from '../lib/index.js';
import { assert, exact } from './_support/asserts.js';

describe('Keys', () => {
  it('ValuesOf', () => {
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

describe('Helpers', () => {
  it('IfNoDeepValue', () => {
    class TestClass {}

    // Builtin / primitive-ish values are leaves
    assert<IfNoDeepValue<string>>(true);
    assert<IfNoDeepValue<number>>(true);
    assert<IfNoDeepValue<boolean>>(true);
    assert<IfNoDeepValue<bigint>>(true);
    assert<IfNoDeepValue<symbol>>(true);
    assert<IfNoDeepValue<null>>(true);
    assert<IfNoDeepValue<undefined>>(true);
    assert<IfNoDeepValue<Date>>(true);
    assert<IfNoDeepValue<RegExp>>(true);

    // `any` must resolve to the literal `true`, not stay `any`
    assert<IfNoDeepValue<any>>(true);

    // Tuples are left untouched, not deep-processed as arrays
    assert<IfNoDeepValue<[string, number]>>(true);
    assert<IfNoDeepValue<[]>>(true);

    // Plain arrays are also excluded (Deep* variants handle array recursion
    // themselves before consulting IfNoDeepValue; IfNoDeepValue<any[]> being
    // true only means "not a plain object to recurse into as-is")
    assert<IfNoDeepValue<string[]>>(true);

    // Functions and constructor (class) references are leaves
    assert<IfNoDeepValue<() => void>>(true);
    assert<IfNoDeepValue<typeof TestClass>>(true);

    // A plain instance of a class is not itself a constructor reference,
    // so it is treated as a regular object and IS deep-processed
    assert<IfNoDeepValue<TestClass>>(false);

    // Map/Set family are leaves
    assert<IfNoDeepValue<Map<string, number>>>(true);
    assert<IfNoDeepValue<ReadonlyMap<string, number>>>(true);
    assert<IfNoDeepValue<WeakMap<object, number>>>(true);
    assert<IfNoDeepValue<Set<string>>>(true);
    assert<IfNoDeepValue<ReadonlySet<string>>>(true);
    assert<IfNoDeepValue<WeakSet<object>>>(true);

    // Plain objects are NOT no-deep values - they should be recursed into
    assert<IfNoDeepValue<{ a: string }>>(false);
    assert<IfNoDeepValue<Record<string, number>>>(false);
  });
});
