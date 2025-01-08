import { IfNoDeepValue } from './helpers.js';
import { DeeperNullish } from './nullish.js';
import { DeeperPartial } from './partial.js';
import { IfNever } from './type-check.js';

/**
 * Returns given type as a Data Transfer Object (DTO) interface, Removes symbol keys and function properties.
 * @template T - The type of the data being transferred.
 */
export type DTO<T> = {
  [K in keyof T as IfNever<
    Exclude<NonNullable<T[K]>, Function>,
    never,
    K
  >]: NonNullable<T[K]> extends (infer U)[] // Deep process arrays
    ? DTO<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? NonNullable<T[K]>
      : // Deep process objects
        DTO<NonNullable<T[K]>>;
};

export type PartialDTO<T> = DeeperPartial<DTO<T>>;
export type PatchDTO<T> = DeeperNullish<DTO<T>>;
