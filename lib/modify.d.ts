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
