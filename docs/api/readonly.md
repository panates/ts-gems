# Readonly

Source: [`lib/readonly.d.ts`](../../lib/readonly.d.ts)

Adds `readonly` modifiers — the mirror image of [Mutable](mutable.md). See
[the `Deep*`/`Deeper*` convention](../api.md#the-deep--deeper-convention) and
the runtime [`asReadonly` cast helpers](helpers.md#runtime-cast-helpers).

## `ReadonlySome<T, K>`

Marks only the properties named in `K` as `readonly`; every other property is
untouched.

```ts
import type { ReadonlySome } from 'ts-gems';

interface Row {
  id: number;
  name: string;
}

type LockedId = ReadonlySome<Row, 'id'>;
// { readonly id: number; name: string }
```

## `DeepReadonly<T>`

Makes every property `readonly`, recursively into nested objects. Array-typed
properties are left exactly as-is — use `DeeperReadonly` to also make array
elements readonly.

```ts
import type { DeepReadonly } from 'ts-gems';

interface Config {
  name: string;
  server: { host: string; port: number };
  tags: string[];
}

type FrozenConfig = DeepReadonly<Config>;
// {
//   readonly name: string;
//   readonly server: { readonly host: string; readonly port: number };
//   readonly tags: string[]; // untouched - it's an array
// }
```

## `DeeperReadonly<T>`

Like `DeepReadonly`, but also makes the element type of array-typed
properties readonly. Tuples are left untouched.

```ts
import type { DeeperReadonly } from 'ts-gems';

interface Config {
  servers: { host: string }[];
  range: [number, number]; // tuple
}

type FrozenConfig = DeeperReadonly<Config>;
// {
//   readonly servers: { readonly host: string }[];
//   readonly range: [number, number]; // tuple - unchanged
// }
```

> Note: `DeeperReadonly` makes the **property** and the **element type**
> readonly; it does not turn the array itself into a `readonly T[]` — push/
> pop on the array reference is still possible unless you also apply
> `Readonly<...>` around the whole property yourself. This also means that
> if the _input_ property was already a `readonly T[]`, `DeeperReadonly`
> normalizes it back down to a plain `T[]` wrapper (only the element type's
> readonly-ness is guaranteed, not the wrapper's).

## `ReadonlyKeys<T>`

Returns the union of property names in `T` that **are** `readonly`
(`keyof PickReadonly<T>`).

```ts
import type { ReadonlyKeys } from 'ts-gems';

interface Row {
  readonly id: number;
  name: string;
}

type Locked = ReadonlyKeys<Row>; // 'id'
```

## `PickReadonly<T>` / `OmitReadonly<T>`

Pick (or omit) only the properties that **are** `readonly`.

```ts
import type { OmitReadonly, PickReadonly } from 'ts-gems';

interface Row {
  readonly id: number;
  name: string;
}

type OnlyReadonly = PickReadonly<Row>; // { readonly id: number }
type OnlyMutable = OmitReadonly<Row>; // { name: string }
```

## `DeepPickReadonly<T>` / `DeepOmitReadonly<T>`

The deep versions of `PickReadonly`/`OmitReadonly` — nested objects are
filtered the same way, recursively.

```ts
import type { DeepOmitReadonly } from 'ts-gems';

interface Row {
  readonly id: number;
  meta: { readonly createdBy: string; label: string };
}

type Editable = DeepOmitReadonly<Row>;
// { meta: { label: string } }
```

A mutable property is always kept by `DeepOmitReadonly`, no matter its value
type — including `null`:

```ts
type I1 = { a: null; readonly b: null };
type Result = DeepOmitReadonly<I1>; // { a: null }
```

## `DeeperPickReadonly<T>` / `DeeperOmitReadonly<T>`

Like `DeepPickReadonly`/`DeepOmitReadonly`, but also recurses into array
elements. Tuples are preserved as-is (never split into a homogeneous array).

```ts
import type { DeeperOmitReadonly } from 'ts-gems';

interface Row {
  readonly id: number;
  tags: { readonly createdBy: string; label: string }[];
  point: readonly [number, number];
}

type Editable = DeeperOmitReadonly<Row>;
// { tags: { label: string }[]; point: readonly [number, number] }
```
