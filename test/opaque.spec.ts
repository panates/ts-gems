import type { IfEquals, Opaque } from '../lib/index.js';
import { assert, exact } from './_support/asserts.js';

describe('Opaque', () => {
  it('Opaque brands are distinct from their base type and from each other', () => {
    type UserId = Opaque<number, 'UserId'>;
    type ProductId = Opaque<number, 'ProductId'>;

    assert<IfEquals<UserId, number>>(false);
    assert<IfEquals<UserId, ProductId>>(false);
    exact<UserId, UserId>(true);
  });

  it('Opaque values remain usable as their base type', () => {
    type UserId = Opaque<number, 'UserId'>;
    const id = 1 as UserId;
    // An opaque value structurally satisfies its base type, so it can be
    // used wherever the base type is expected; this line simply must compile.
    const n: number = id;
    void n;
  });
});
