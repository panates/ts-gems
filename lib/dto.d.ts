import { IfNoDeepValue } from './helpers.js';
import { DeeperNullish } from './nullish.js';
import { DeeperPartial } from './partial.js';
import { IfNever } from './type-check.js';

/**
 * Returns the given type as a Data Transfer Object (DTO) interface, Removes symbol keys and function properties.
 * @template T - The type of the data being transferred.
 */
export type DTO<T, X = never> = {
  [K in keyof T as IfNever<
    Exclude<NonNullable<T[K]>, Function | symbol>,
    never,
    K
  >]: NonNullable<T[K]> extends (infer U)[] // Deep process arrays
    ? DTO<U>[]
    : // Do not deep process No-Deep values
      IfNoDeepValue<NonNullable<T[K]>> extends true
      ? NonNullable<T[K] | X>
      : // Deep process objects
        DTO<NonNullable<T[K] | X>>;
};

export type PartialDTO<T, X = never> = DeeperPartial<DTO<T, X>>;
export type PatchDTO<T, X = never> = DeeperNullish<DTO<T, X>>;
