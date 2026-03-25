// noinspection JSUnusedGlobalSymbols

import type { DeeperMutable, DeepMutable, Mutable } from './mutable.js';
import type { DeeperPartial, DeepPartial } from './partial.js';
import type { DeeperReadonly, DeepReadonly } from './readonly.js';
import type { DeeperRequired, DeepRequired } from './required.js';

export type * from './combine.js';
export type * from './dto.js';
export type * from './helpers.js';
export type * from './logical.js';
export type * from './mutable.js';
export type * from './non-nullable.js';
export type * from './nullish.js';
export type * from './omit.js';
export type * from './omit-never.js';
export type * from './omit-undefined.js';
export type * from './opaque.js';
export type * from './partial.js';
export type * from './pick.js';
export type * from './readonly.js';
export type * from './required.js';
export type * from './type-check.js';
export type * from './types.js';

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
