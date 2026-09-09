# Required

Source: [`lib/required.d.ts`](../../lib/required.d.ts)

Makes properties required (and strips `undefined` from their type). See
[the `Deep*`/`Deeper*` convention](../api.md#the-deep--deeper-convention) and
the runtime [`asRequired` cast helpers](helpers.md#runtime-cast-helpers).

## `RequiredSome<T, K>`

Marks only the properties named in `K` as required; the rest of `T` is left
exactly as declared.

```ts
import type { RequiredSome } from 'ts-gems';

interface UpdateUserInput {
  name?: string;
  email?: string;
}

type CreateUserInput = RequiredSome<UpdateUserInput, 'name'>;
// { name: string; email?: string }
```

## `DeepRequired<T>`

Like the built-in `Required<T>`, but also makes nested object properties
required, recursively. Array-typed properties are left as-is.

```ts
import type { DeepRequired } from 'ts-gems';

interface Config {
  name?: string;
  server?: { host?: string; port?: number };
  tags?: string[];
}

type FullConfig = DeepRequired<Config>;
// {
//   name: string;
//   server: { host: string; port: number };
//   tags: string[]; // required now, but its element type is untouched
// }
```

## `DeeperRequired<T>`

Like `DeepRequired`, but also makes array element properties required.
Tuples are left untouched.

```ts
import type { DeeperRequired } from 'ts-gems';

interface Config {
  servers?: { host?: string }[];
  range?: [number, number]; // tuple
}

type FullConfig = DeeperRequired<Config>;
// {
//   servers: { host: string }[];
//   range: [number, number]; // tuple - unchanged
// }
```

`DeeperRequired` keeps its array-awareness through every level of nesting —
an array several objects deep is still processed, not just one at the top:

```ts
interface Nested {
  a?: { b?: { c?: number }[] };
}

type Result = DeeperRequired<Nested>;
// { a: { b: { c: number }[] } }
```

## `RequiredKeys<T>`

Returns the union of property names in `T` that are required
(`keyof PickRequired<T>`).

```ts
import type { RequiredKeys } from 'ts-gems';

interface Row {
  id: number;
  nickname?: string;
}

type Required = RequiredKeys<Row>; // 'id'
```

## `PickRequired<T>` / `OmitRequired<T>`

Pick (or omit) only the properties that are required.

```ts
import type { OmitRequired, PickRequired } from 'ts-gems';

interface Row {
  id: number;
  nickname?: string;
}

type OnlyRequired = PickRequired<Row>; // { id: number }
type OnlyOptional = OmitRequired<Row>; // { nickname?: string }
```

## `DeepPickRequired<T>` / `DeepOmitRequired<T>`

The deep versions of `PickRequired`/`OmitRequired`. A property is only ever
recursed into when **it is itself optional** — a required property is
dropped by `DeepOmitRequired` outright, without inspecting what's inside it
(there would be nothing to "omit the required parts of", since the whole
property is required in the first place).

```ts
import type { DeepOmitRequired } from 'ts-gems';

interface Row {
  id: number; // required -> dropped entirely
  meta?: { label?: string; note: string }; // optional -> kept & recursed
}

type Optional = DeepOmitRequired<Row>;
// { meta?: { label?: string } } - `note` was required, so it's dropped too
```

## `DeeperPickRequired<T>` / `DeeperOmitRequired<T>`

Like `DeepPickRequired`/`DeepOmitRequired`, but also recurses into array
elements. Tuples are preserved as-is.

```ts
import type { DeeperOmitRequired } from 'ts-gems';

interface Row {
  tags?: { label?: string; note: string }[];
}

type Optional = DeeperOmitRequired<Row>;
// { tags?: { label?: string }[] }
```
