export type Primitive = string | number | boolean | null | bigint | symbol | undefined;
export type Builtin = Primitive | Function | Date | Error | RegExp;
export type NonObj = Primitive | Function;
export type NonSymbol = Exclude<Builtin, symbol>;

export type Maybe<T> = T | undefined;
export type Nullable<T> = T | undefined | null;

export interface Type<T = any> {
    new(...args: any[]): T;
}

export type Awaited<T> = T extends PromiseLike<infer PT> ? PT : T;

export type Class<Args extends any[] = any[], Instance = {}, Static = {}> =
    (new(...args: Args) => Instance) & Static;

export type Thunk<T, Args extends any[] = any[]> = T | ((...args: Args) => T);
export type AsyncThunk<T, Args extends any[] = any[]> = T | ((...args: Args) => T) | ((...args: Args) => Promise<T>);
