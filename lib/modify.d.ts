/**
 * Make all properties in T writable
 */
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Combination of Partial and Writable
 */
export type Buildable<T> = Partial<Writable<T>>;

/**
 * Marks given keys as optional
 */
export type PartialSome<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

/**
 * Marks given keys as required
 */
export type RequiredSome<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Marks given keys as readonly
 */
export type ReadonlySome<T, K extends keyof T> = Readonly<Pick<T, K>> & Omit<T, K>;

/**
 * Marks given keys as writable
 */
export type WritableSome<T, K extends keyof T> = Writable<Pick<T, K>> & Omit<T, K>;

/**
 * Merges two types without merging types of elements.
 */
export type Combine<A, B> = A & Exclude<B, keyof A>;
