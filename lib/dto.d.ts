import { IfNoDeepValue } from './helpers.js';
import { DeeperNullish } from './nullish.js';
import { DeeperPartial } from './partial.js';
import { IfNever, IfTuple } from './type-check.js';

/**
 * Narrows T to a Data Transfer Object shape: a plain, serializable snapshot
 * of T's data, safe to persist to a database, encode to JSON, or send over
 * an API. It strips whatever only exists in a live JavaScript runtime and
 * cannot survive that round-trip - function properties, and properties
 * whose value or key is a symbol - recursively into nested objects, arrays,
 * and tuples.
 *
 * DTO only removes those non-serializable members. It does not otherwise
 * change a value's mutability, or a property's readonly/optional modifiers
 * - "is this representable as plain data" is orthogonal to "is this
 * mutable/readonly", which is the concern of the
 * Mutable/Readonly/Partial/Required families instead. In particular, a
 * `readonly T[]` property stays a `readonly T[]` after DTO - it is still
 * perfectly serializable, so DTO has no reason to touch it.
 *
 * @template T - The type of the data being transferred.
 * @template X - An extra type unioned into every remaining property's
 *   value, useful for tagging every field with a shared marker (e.g. a
 *   sentinel for "field not selected"). See docs/api/dto.md.
 */
export type DTO<T, X = never> = {
  [
    K in keyof T as K extends symbol
      ? never
      : IfNever<Exclude<NonNullable<T[K]>, Function | symbol>, never, K>
  ]: IfTuple<NonNullable<T[K]>> extends true
    ? DTOTuple<NonNullable<T[K]>, X>
    : NonNullable<T[K]> extends readonly (infer U)[] // Deep process arrays
      ? NonNullable<T[K]> extends any[]
        ? DTO<U>[] // was a mutable array - stays mutable
        : readonly DTO<U>[] // was a readonly array - DTO doesn't touch mutability
      : DTOValue<T[K], X>;
};

type DTOValue<V, X> =
  IfNoDeepValue<NonNullable<V>> extends true
    ? NonNullable<V | X>
    : DTO<NonNullable<V | X>>;

type DTOTuple<T, X> = T extends readonly [infer Head, ...infer Rest]
  ? IfNever<Exclude<NonNullable<Head>, Function | symbol>> extends true
    ? DTOTuple<Rest, X>
    : [DTOValue<Head, X>, ...DTOTuple<Rest, X>]
  : [];

/**
 * `DTO<T, X>` with every property (including nested ones and array/tuple
 * elements) made optional. For request bodies where the data is expected to
 * be incomplete - a "create" endpoint where some fields have server-side
 * defaults, or an "update" endpoint where the caller only sends the fields
 * they want to change and omitting a key means "leave it as it is".
 *
 * See `PatchDTO` for the alternative where omitting a key and sending
 * `null` are meant to mean different things.
 */
export type PartialDTO<T, X = never> = DeeperPartial<DTO<T, X>>;

/**
 * `DTO<T, X>` with every property (including nested ones and array/tuple
 * elements) made optional and nullable. For "patch"-style update endpoints
 * that need to distinguish "omit this key, leave the field unchanged" from
 * "send `null` for this key, clear the field" - `PartialDTO` alone cannot
 * express that second case since it never adds `null`.
 */
export type PatchDTO<T, X = never> = DeeperNullish<DTO<T, X>>;
