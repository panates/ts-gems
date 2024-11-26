// noinspection JSUnusedGlobalSymbols

import type { DeeperMutable, DeepMutable, Mutable } from './mutable';
import type { DeeperPartial, DeepPartial } from './partial';
import type { DeeperReadonly, DeepReadonly } from './readonly';
import type { DeeperRequired, DeepRequired } from './required';

export type * from './combine';
export type * from './dto';
export type * from './helpers';
export type * from './logical';
export type * from './mutable';
export type * from './non-nullable';
export type * from './nullish';
export type * from './omit';
export type * from './omit-never';
export type * from './omit-undefined';
export type * from './opaque';
export type * from './partial';
export type * from './pick';
export type * from './readonly';
export type * from './required';
export type * from './type-check';
export type * from './types';

declare function asMutable<T>(x: T): Mutable<T>;

declare function asDeepMutable<T>(x: T): DeepMutable<T>;

declare function asDeeperMutable<T>(x: T): DeeperMutable<T>;

declare function asReadonly<T>(x: T): Readonly<T>;

declare function asDeepReadonly<T>(x: T): DeepReadonly<T>;

declare function asDeeperReadonly<T>(x: T): DeeperReadonly<T>;

declare function asPartial<T>(x: T): Partial<T>;

declare function asDeepPartial<T>(x: T): DeepPartial<T>;

declare function asDeeperPartial<T>(x: T): DeeperPartial<T>;

declare function asRequired<T>(x: T): Required<T>;

declare function asDeepRequired<T>(x: T): DeepRequired<T>;

declare function asDeeperRequired<T>(x: T): DeeperRequired<T>;

export {
  asDeeperMutable,
  asDeeperPartial,
  asDeeperReadonly,
  asDeeperRequired,
  asDeepMutable,
  asDeepPartial,
  asDeepReadonly,
  asDeepRequired,
  asMutable,
  asPartial,
  asReadonly,
  asRequired,
};
