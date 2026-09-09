# Mutable

Source: [`lib/mutable.d.ts`](../../lib/mutable.d.ts)

Strips `readonly` modifiers. See [the `Deep*`/`Deeper*` convention](../api.md#the-deep--deeper-convention)
for what "deeply" means here, and the runtime [`asMutable` cast
helpers](helpers.md#runtime-cast-helpers).

## `Mutable<T>`

Removes `readonly` from every top-level property. Properties whose value is
`never` (after stripping `undefined`) are dropped, matching the rest of the
library's "never means absent" convention.

```ts
import type { Mutable } from 'ts-gems';

interface Point {
  readonly x: number;
  readonly y: number;
}

type MutablePoint = Mutable<Point>;
// { x: number; y: number }

const p: MutablePoint = { x: 1, y: 2 };
p.x = 3; // ok - no longer readonly
```

## `MutableSome<T, K>`

Removes `readonly` from only the properties named in `K`; every other
property is untouched.

```ts
import type { MutableSome } from 'ts-gems';

interface Row {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
}

type EditableRow = MutableSome<Row, 'name'>;
// { readonly id: number; name: string; readonly createdAt: Date }
```

## `DeepMutable<T>`

Like `Mutable`, but also strips `readonly` from nested object properties.
Array-typed properties are left exactly as they are (see the convention
table) — use `DeeperMutable` to also transform array element types.

```ts
import type { DeepMutable } from 'ts-gems';

interface Config {
  readonly name: string;
  readonly server: {
    readonly host: string;
    readonly port: number;
  };
  readonly tags: string[];
}

type MutableConfig = DeepMutable<Config>;
// {
//   name: string;
//   server: { host: string; port: number };
//   tags: string[]; // untouched - it's an array
// }
```

## `DeeperMutable<T>`

Like `DeepMutable`, but also makes the element type of array-typed
properties mutable. Tuples are left untouched (their fixed shape is
preserved as-is).

```ts
import type { DeeperMutable } from 'ts-gems';

interface Config {
  readonly server: { readonly host: string };
  readonly servers: { readonly host: string }[];
  readonly range: readonly [number, number]; // tuple
}

type MutableConfig = DeeperMutable<Config>;
// {
//   server: { host: string };
//   servers: { host: string }[]; // element type made mutable too
//   range: readonly [number, number]; // tuple - unchanged
// }
```

## `MutableKeys<T>`

Returns the union of property names in `T` that are **not** `readonly`.

```ts
import type { MutableKeys } from 'ts-gems';

interface Row {
  readonly id: number;
  name: string;
}

type Editable = MutableKeys<Row>; // 'name'
```

## `PickMutable<T>` / `OmitMutable<T>`

Pick (or omit) only the properties that are **not** `readonly`. These are
implemented in terms of [`OmitReadonly`/`PickReadonly`](readonly.md), since
"mutable" and "readonly" partition every property into exactly two sets.

```ts
import type { OmitMutable, PickMutable } from 'ts-gems';

interface Row {
  readonly id: number;
  name: string;
}

type OnlyMutable = PickMutable<Row>; // { name: string }
type OnlyReadonly = OmitMutable<Row>; // { readonly id: number }
```

## `DeepPickMutable<T>` / `DeepOmitMutable<T>`

The deep versions of `PickMutable`/`OmitMutable` — nested objects are
filtered the same way, recursively. Delegates to
[`DeepOmitReadonly`/`DeepPickReadonly`](readonly.md).

```ts
import type { DeepPickMutable } from 'ts-gems';

interface Row {
  readonly id: number;
  meta: { readonly createdBy: string; label: string };
}

type Editable = DeepPickMutable<Row>;
// { meta: { label: string } }
```

## `DeeperPickMutable<T>` / `DeeperOmitMutable<T>`

Like `DeepPickMutable`/`DeepOmitMutable`, but also recurses into array
elements. Delegates to
[`DeeperOmitReadonly`/`DeeperPickReadonly`](readonly.md).

```ts
import type { DeeperPickMutable } from 'ts-gems';

interface Row {
  readonly id: number;
  tags: { readonly createdBy: string; label: string }[];
}

type Editable = DeeperPickMutable<Row>;
// { tags: { label: string }[] }
```
