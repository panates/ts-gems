# Opaque

Source: [`lib/opaque.d.ts`](../../lib/opaque.d.ts)

## `Opaque<T, N extends string>`

```ts
type Opaque<T, N extends string> = T & {
  readonly [Symbols.base]: N;
  readonly [Symbols.brand]: N;
};
```

Creates a _branded_ type: structurally still based on `T`, but tagged with a
unique string literal `N` so that two `Opaque` types built from the same
base `T` are no longer interchangeable by accident. This is the classic
["nominal typing" workaround](https://michalzalecki.com/nominal-typing-in-typescript/)
for a structurally-typed language — useful for IDs, currency amounts, or any
primitive that shouldn't be swappable with another primitive of the same
underlying type.

```ts
import type { Opaque } from 'ts-gems';

type UserId = Opaque<number, 'UserId'>;
type ProductId = Opaque<number, 'ProductId'>;

function getUser(id: UserId) {
  /* ... */
}

declare const userId: UserId;
declare const productId: ProductId;
declare const rawNumber: number;

getUser(userId); // ok
getUser(productId); // type error - different brand, even though both are `number`
getUser(rawNumber); // type error - a plain number isn't branded at all
```

Because `Opaque<T, N>` is an intersection with `T`, a branded value is still
usable _as_ its base type — the restriction only goes one way:

```ts
const id = 1 as UserId;
const n: number = id; // ok - a UserId structurally satisfies `number`
```

You create a branded value with a type assertion (there's no runtime
wrapping — the brand only exists at the type level):

```ts
function toUserId(id: number): UserId {
  return id as UserId;
}
```
