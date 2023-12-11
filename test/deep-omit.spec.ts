import { exact } from './_support/asserts';
import {
  DeepOmitNever,
  DeepOmitOptional, DeepOmitReadonly,
  DeepOmitRequired, DeepOmitWritable, HighDeepOmitNever,
  HighDeepOmitOptional, HighDeepOmitReadonly,
  HighDeepOmitRequired, HighDeepOmitWritable,
} from '../lib';

describe('DeepOmit', function () {

  test('DeepOmitOptional', () => {
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
      f?: { a?: string; b: number }[],
      n: never
    }
    exact<DeepOmitOptional<I1>, {
      b: string,
      c: { b: number },
      e: { a?: string; b: number }[]
    }>(true);
  });

  test('HighDeepOmitOptional', () => {
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
      f?: { a?: string; b: number }[],
      n: never
    }
    exact<HighDeepOmitOptional<I1>, {
      b: string,
      c: { b: number },
      e: { b: number }[]
    }>(true);
  });

  test('DeepOmitRequired', () => {
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
      f?: { a?: string; b: number }[],
      n?: never
    }

    exact<DeepOmitRequired<I1>, {
      a?: number;
      d?: {
        a?: string;
      },
      f?: { a?: string; b: number }[]
    }>(true);
  });


  test('HighDeepOmitRequired', () => {
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
      f?: { a?: string; b: number }[],
      n: never
    }

    exact<HighDeepOmitRequired<I1>, {
      a?: number;
      d?: {
        a?: string;
      },
      f?: { a?: string }[]
    }>(true);
  });

  test('DeepOmitReadonly', () => {
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
      n: never;
    }
    exact<DeepOmitReadonly<I1>, {
      a: number;
      e: { a?: string; readonly b: number }[];
      g: () => void;
    }>(true);
  });

  test('HighDeepOmitReadonly', () => {
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
      n: never;
    }
    exact<HighDeepOmitReadonly<I1>, {
      a: number;
      e: { a?: string }[];
      g: () => void;
    }>(true);
  });

  test('DeepOmitWritable', () => {
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
      n: never;
    }

    exact<DeepOmitWritable<I1>, {
      readonly b: string;
      readonly d?: {
        readonly a?: string;
      };
      readonly f?: { readonly a?: string; b: number }[];
      readonly h: () => void;
    }>(true);
  });

  test('HighDeepOmitWritable', () => {
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
      n: never;
    }

    exact<HighDeepOmitWritable<I1>, {
      readonly b: string;
      readonly d?: {
        readonly a?: string;
      };
      readonly f?: { readonly a?: string; }[];
      readonly h: () => void;
    }>(true);
  });

  test('DeepOmitNever', () => {
    type I1 = {
      a?: number;
      b: string,
      b1: never,
      b2: never,
      c: {
        a?: string;
        b: number,
        b1: never,
        b2: never,
      },
      d?: {
        a?: string;
        b: number;
      },
      e: {
        a?: string;
        b: number;
        b1: never,
        b2: never,
      }[],
      f?: {
        a?: string;
        b: number;
        b1: never,
        b2: never,
      }[]
    }
    exact<DeepOmitNever<I1>, {
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
      e: {
        a?: string;
        b: number;
        b1: never,
        b2: never,
      }[],
      f?: {
        a?: string;
        b: number;
        b1: never,
        b2: never,
      }[]
    }>(true);
  });

  test('HighDeepOmitNever', () => {
    type I1 = {
      a?: number;
      b: string,
      b1: never,
      b2: never,
      c: {
        a?: string;
        b: number,
        b1: never,
        b2: never,
      },
      d?: {
        a?: string;
        b: number;
      },
      e: {
        a?: string;
        b: number;
        b1: never,
        b2: never,
      }[],
      f?: {
        a?: string;
        b: number;
        b1: never,
        b2: never,
      }[]
    }
    exact<HighDeepOmitNever<I1>, {
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
      e: {
        a?: string;
        b: number;
      }[],
      f?: {
        a?: string;
        b: number;
      }[]
    }>(true);
  });


});
