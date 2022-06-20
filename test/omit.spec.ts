import {exact} from './_support/asserts';
import {
  OmitJson, OmitOptional, OmitReadonly, OmitRequired, OmitWritable, StrictOmit,
} from '../lib';

describe('Omit', function () {

  test('StrictOmit', () => {
    type I1 = {
      a?: number;
      b: string
    }
    exact<StrictOmit<I1, 'b'>, {
      a?: number
    }>(true);
  });

  test('OmitOptional', () => {
    type I1 = {
      a?: number;
      b: string,
      c: {
        a?: string;
        b: number
      },
      d?: {
        a?: string;
        b: number;
      },
      e: { a?: string; b: number }[],
      f?: { a?: string; b: number }[]
    }
    exact<OmitOptional<I1>, {
      b: string,
      c: {
        a?: string;
        b: number
      },
      e: { a?: string; b: number }[]
    }>(true);
  });

  test('OmitRequired', () => {
    type I1 = {
      a?: number;
      b: string,
      c: {
        a?: string;
        b: number
      },
      d?: {
        a?: string;
        b: number;
      },
      e: { a?: string; b: number }[],
      f?: { a?: string; b: number }[]
    }
    exact<OmitRequired<I1>, {
      a?: number;
      d?: {
        a?: string;
        b: number;
      },
      f?: { a?: string; b: number }[]
    }>(true);
  });

  test('OmitReadonly', () => {
    type I1 = {
      a: number;
      readonly b: string;
      readonly c: {
        a: string;
        readonly b: number;
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      e: { a?: string; readonly b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
    }
    exact<OmitReadonly<I1>, {
      a: number;
      e: { a?: string; readonly b: number }[];
      g: () => void;
    }>(true);
  });

  test('OmitWritable', () => {
    type I1 = {
      a: number;
      readonly b: string;
      c: {
        a: string;
        readonly b: number
      };
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      e?: { a?: string; readonly b: number }[];
      readonly f?: { readonly a?: string; b: number }[];
      g: () => void;
      readonly h: () => void;
    }

    exact<OmitWritable<I1>, {
      readonly b: string;
      readonly d?: {
        readonly a?: string;
        b: number;
      };
      readonly f?: { readonly a?: string; b: number }[];
      readonly h: () => void;
    }>(true);
  });

  test('OmitJson', () => {
    type I1 = {
      a?: number;
      b: string;
      c: {
        a?: string;
        b: () => void;
      };
      d: string[];
      e?: RegExp;
      f: Date;
      h: () => void
      [Symbol.species]: number;
    }
    exact<OmitJson<I1>, {
      h: () => void
      [Symbol.species]: number;
    }>(true);
  });

});
