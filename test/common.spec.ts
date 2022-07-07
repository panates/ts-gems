import { assert } from './_support/asserts';
import {
  IfEquals,
  NoUnion, Opaque,
} from '../lib';

describe('Common', function () {

  test('NoUnion', () => {
    assert<IfEquals<NoUnion<'a'>, 'a'>>(true);
    assert<IfEquals<NoUnion<'a' | 'b'>, never>>(true);
  });

  test('NoUnion', () => {
    type a = Opaque<string, 'url'>;
    type b = Opaque<string, 'email'>;
    assert<IfEquals<a, b>>(false);
  });

});
