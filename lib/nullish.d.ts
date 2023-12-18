import { IfNoDeepValue } from './helpers';
import { IfNever } from './type-check';

/**
 * Make all properties in T nullable
 */
export type Nullish<T = null> = {
  [P in keyof T]?: T[P] | null;
};


/**
 * Make all properties in T nullable deeply
 */
export type DeepNullish<T> = {
  [K in keyof T as (IfNever<Exclude<T[K], undefined>, never, K>)]?:
  // Do not deep process No-Deep values
  IfNoDeepValue<Exclude<T[K], undefined>> extends true ? (T[K] | null)
      // Deep process objects
      : DeepNullish<Exclude<T[K], undefined>> | null
};

/**
 * Make all properties in T nullable deeply including arrays
 */
export type DeeperNullish<T> = {
  [K in keyof T as (IfNever<Exclude<T[K], undefined>, never, K>)]?:
  // Deep process arrays
  Exclude<T[K], undefined> extends (infer U)[] ? DeeperNullish<U>[] | null
      // Do not deep process No-Deep values
      : IfNoDeepValue<Exclude<T[K], undefined>> extends true ? (T[K] | null)
          // Deep process objects
          : DeeperNullish<Exclude<T[K], undefined>> | null
};
