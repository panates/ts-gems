import {exact} from './_support/asserts';
import {
  Buildable, PartialSome, ReadonlySome, RequiredSome,
  Writable, WritableSome,
} from '../lib';

describe('Modify', function () {

  test('Writable', () => {
    type I1 = {
      a?: number;
      readonly b: {
        a?: string;
        readonly b?: number
      };
      readonly c: [{ readonly a: string }]
    }
    exact<Writable<I1>, {
      a?: number;
      b: {
        a?: string;
        readonly b?: number
      };
      c: [{ readonly a: string }]
    }>(true);
  });

  test('Buildable', () => {
    type I1 = {
      a?: number;
      readonly b: {
        a?: string;
        readonly b?: number
      };
      readonly c: [{ readonly a: string }]
    }
    exact<Buildable<I1>, {
      a?: number;
      b?: {
        a?: string;
        readonly b?: number
      };
      c?: [{ readonly a: string }]
    }>(true);
  });

  test('PartialSome', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: string;
    }

    exact<PartialSome<I1, 'a' | 'b'>, {
      a?: number;
      readonly b?: string;
      readonly c: string;
    }>(true);
  });

  test('RequiredSome', () => {
    type I1 = {
      a?: number;
      readonly b?: string;
      readonly c?: string;
    }

    exact<RequiredSome<I1, 'a' | 'b'>, {
      a: number;
      readonly b: string;
      readonly c?: string;
    }>(true);
  });

  test('ReadonlySome', () => {
    type I1 = {
      a?: number;
      b: string;
      c: string;
    }

    exact<ReadonlySome<I1, 'a' | 'b'>, {
      readonly a?: number;
      readonly b: string;
      c: string;
    }>(true);
  });

  test('WritableSome', () => {
    type I1 = {
      readonly a?: number;
      readonly b: string;
      readonly c: string;
    }

    exact<WritableSome<I1, 'a' | 'b'>, {
      a?: number;
      b: string;
      readonly c: string;
    }>(true);
  });

});
