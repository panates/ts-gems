# DTO

Source: [`lib/dto.d.ts`](../../lib/dto.d.ts)

Turns any type into a plain Data Transfer Object shape: strips function
properties and symbol-keyed properties, and always deep-processes nested
objects and arrays (there's no shallow/`Deep` variant — `DTO` behaves like
the `Deeper*` members of [the convention](../api.md#the-deep--deeper-convention)).
Tuples are left untouched, same as everywhere else in the library.

## `DTO<T, X = never>`

```ts
import type { DTO } from 'ts-gems';

interface User {
  name: string;
  age?: number;
  greet(): void; // function - removed
  [Symbol.iterator]: () => Iterator<unknown>; // symbol key - removed
}

type UserDTO = DTO<User>;
// { name: string; age?: number }
```

Nested objects and arrays are always processed, recursively:

```ts
interface Order {
  id: string;
  createdBy: { name: string; greet(): void };
  items: { sku: string; validate(): boolean }[];
}

type OrderDTO = DTO<Order>;
// {
//   id: string;
//   createdBy: { name: string };
//   items: { sku: string }[];
// }
```

### The `X` parameter

The second type parameter, `X`, is unioned into **every** remaining
property's value type (through `NonNullable<T[K] | X>`, applied at every
nesting level). This is handy for tagging every field of the DTO with a
shared extra type — for example, a sentinel used to represent "field
explicitly not selected" in a partial-response GraphQL/RPC layer:

```ts
import type { DTO } from 'ts-gems';

const NOT_SELECTED = Symbol('not-selected');
type NotSelected = typeof NOT_SELECTED;

interface User {
  name: string;
  age?: number;
}

type SparseUserDTO = DTO<User, NotSelected>;
// { name: string | NotSelected; age?: number | NotSelected }
```

> Because `X` is combined via `NonNullable<T[K] | X>`, passing `null` or
> `undefined` as `X` has no visible effect — both are immediately stripped
> again. Use a non-nullish sentinel (a literal, a branded/[`Opaque`](opaque.md)
> type, or a `unique symbol` as above) if you need one.

## `PartialDTO<T, X = never>`

```ts
type PartialDTO<T, X = never> = DeeperPartial<DTO<T, X>>;
```

`DTO<T, X>` with every property (including nested ones and array elements)
made optional via [`DeeperPartial`](partial.md#deeperpartialt) — a common
shape for "create" endpoint request bodies where every field may be omitted.

```ts
import type { PartialDTO } from 'ts-gems';

interface User {
  name: string;
  profile: { bio: string };
}

type CreateUserBody = PartialDTO<User>;
// { name?: string; profile?: { bio?: string } }
```

## `PatchDTO<T, X = never>`

```ts
type PatchDTO<T, X = never> = DeeperNullish<DTO<T, X>>;
```

`DTO<T, X>` with every property (including nested ones and array elements)
made optional **and** nullable via [`DeeperNullish`](nullish.md#deepernullisht)
— a common shape for "patch"/"update" endpoint request bodies, where `null`
means "clear this field" and omitting the key means "leave it unchanged".

```ts
import type { PatchDTO } from 'ts-gems';

interface User {
  name: string;
  profile: { bio: string };
}

type UpdateUserBody = PatchDTO<User>;
// { name?: string | null; profile?: { bio?: string | null } | null }
```
