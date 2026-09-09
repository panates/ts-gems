# Base Types

Source: [`lib/types.d.ts`](../../lib/types.d.ts)

Foundational type aliases used throughout the rest of the library, and handy
on their own.

## `Primitive`

```ts
type Primitive = string | number | boolean | null | bigint | symbol | undefined;
```

```ts
import type { Primitive } from 'ts-gems';

function serialize(value: Primitive): string {
  return String(value);
}

serialize('x'); // ok
serialize({}); // type error - object is not a Primitive
```

## `Builtin`

```ts
type Builtin =
  | Primitive
  | Function
  | String
  | Number
  | Date
  | Error
  | RegExp
  | Buffer
  | ArrayBuffer
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | URL
  | ReadableStream
  | WritableStream;
```

The set of JavaScript built-in types that the `Deep*`/`Deeper*` transform
families (see [the root convention](../api.md#the-deep--deeper-convention))
treat as **leaves** — never recursed into. Note that `Map`/`Set`/`WeakMap`/
`WeakSet` are _not_ part of `Builtin`; those are excluded from deep
processing separately (see [`IfNoDeepValue`](helpers.md#ifnodeepvaluet)).

## `Type<T = any>`

```ts
interface Type<T = any> {
  new (...args: any[]): T;
}
```

Represents _a constructor_ whose instances are of type `T` — i.e. the value
`SomeClass` itself (`typeof SomeClass`), not an instance of it.

```ts
import type { Type } from 'ts-gems';

class User {
  constructor(public name: string) {}
}

function createInstance<T>(ctor: Type<T>, ...args: any[]): T {
  return new ctor(...args);
}

const user = createInstance(User, 'Ada'); // user: User
```

## `Class<Args, Instance, Static>`

```ts
type Class<Args extends any[] = any[], Instance = {}, Static = {}> = (new (
  ...args: Args
) => Instance) &
  Static;
```

Like [`Type`](#typet--any), but additionally lets you describe the
constructor's own (static) members and the exact constructor argument types.

```ts
import type { Class } from 'ts-gems';

type UserClass = Class<[name: string], { name: string }, { table: string }>;

declare const UserModel: UserClass;
UserModel.table; // string - a static member
new UserModel('Ada').name; // string - an instance member
```

## `Maybe<T>`

```ts
type Maybe<T> = T | undefined;
```

```ts
import type { Maybe } from 'ts-gems';

function greet(name: Maybe<string>) {
  return `Hello, ${name ?? 'stranger'}`;
}
```

## `Nullish<T = null>`

```ts
type Nullish<T = null> = T | undefined | null;
```

```ts
import type { Nullish } from 'ts-gems';

let value: Nullish<number>; // number | undefined | null
```

## `Awaited<T>`

```ts
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
```

Unwraps a `Promise`/`PromiseLike`, or returns `T` unchanged if it isn't one.

```ts
import type { Awaited } from 'ts-gems';

type A = Awaited<Promise<string>>; // string
type B = Awaited<number>; // number
```

## `Thunk<T>` / `ThunkAsync<T>`

```ts
type Thunk<T> = T | (() => T);
type ThunkAsync<T> = Thunk<T> | (() => Promise<T>);
```

A value, or a (possibly async) function that produces one — useful for
lazily-computed configuration values.

```ts
import type { Thunk } from 'ts-gems';

function resolveThunk<T>(thunk: Thunk<T>): T {
  return typeof thunk === 'function' ? (thunk as () => T)() : thunk;
}

resolveThunk(42); // ok
resolveThunk(() => 42); // ok
```

## `TypeThunk<T = any>` / `TypeThunkAsync<T = any>`

```ts
type TypeThunk<T = any> = Thunk<Type<T>>;
type TypeThunkAsync<T = any> = ThunkAsync<Type<T>>;
```

A [`Type<T>`](#typet--any) (a class reference), or a function that returns
one — a common pattern for deferring circular class references (e.g. in
decorator-based ORMs/DI containers).

```ts
import type { TypeThunk } from 'ts-gems';

class Author {}

const authorType: TypeThunk<Author> = () => Author;
```

## `MaybePromise<T>`

```ts
type MaybePromise<T> = T | Promise<T>;
```

```ts
import type { MaybePromise } from 'ts-gems';

async function run(fn: () => MaybePromise<number>): Promise<number> {
  return fn();
}
```

## `PropertyType<T, K>`

```ts
type PropertyType<T, K extends keyof T> = T[K];
```

An explicit, named alias for indexed access — mostly useful for documentation
clarity or as a stable API when refactoring generic helpers.

```ts
import type { PropertyType } from 'ts-gems';

interface User {
  name: string;
}

type NameType = PropertyType<User, 'name'>; // string
```

## `ElementType<T, K>`

```ts
type ElementType<
  T extends { [P in K & any]: any },
  K extends keyof T | number,
> = T[K];
```

Returns the element type of an array, tuple, or object at index/key `K`.

```ts
import type { ElementType } from 'ts-gems';

type Tuple = [string, number];
type First = ElementType<Tuple, 0>; // string

type List = string[];
type Item = ElementType<List, number>; // string
```
