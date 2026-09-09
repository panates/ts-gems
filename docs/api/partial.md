# Partial

Source: [`lib/partial.d.ts`](../../lib/partial.d.ts)

Makes properties optional. See [the `Deep*`/`Deeper*`
convention](../api.md#the-deep--deeper-convention) and the runtime
[`asPartial` cast helpers](helpers.md#runtime-cast-helpers).

## `PartialSome<T, K>`

Marks only the properties named in `K` as optional; the rest of `T` is
required exactly as declared.

```ts
import type { PartialSome } from 'ts-gems';

interface CreateUserInput {
  name: string;
  email: string;
  role: string;
}

type UpdateUserInput = PartialSome<CreateUserInput, 'email' | 'role'>;
// { name: string; email?: string; role?: string }
```

## `DeepPartial<T>`

Like the built-in `Partial<T>`, but also makes nested object properties
optional, recursively. Array-typed properties are left as-is.

```ts
import type { DeepPartial } from 'ts-gems';

interface Config {
  name: string;
  server: { host: string; port: number };
  tags: string[];
}

type PartialConfig = DeepPartial<Config>;
// {
//   name?: string;
//   server?: { host?: string; port?: number };
//   tags?: string[]; // untouched - it's an array
// }
```

## `DeeperPartial<T>`

Like `DeepPartial`, but also makes array element properties optional.
Tuples are left untouched.

```ts
import type { DeeperPartial } from 'ts-gems';

interface Config {
  servers: { host: string }[];
  range: [number, number]; // tuple
}

type PartialConfig = DeeperPartial<Config>;
// {
//   servers?: { host?: string }[];
//   range?: [number, number]; // tuple - unchanged
// }
```

## `OptionalKeys<T>`

Returns the union of property names in `T` that are optional.

```ts
import type { OptionalKeys } from 'ts-gems';

interface Row {
  id: number;
  nickname?: string;
}

type Optional = OptionalKeys<Row>; // 'nickname'
```

## `PickOptional<T>` / `OmitOptional<T>`

Pick (or omit) only the properties that are optional. Implemented in terms
of [`OmitRequired`/`PickRequired`](required.md), since "optional" and
"required" partition every property into exactly two sets.

```ts
import type { OmitOptional, PickOptional } from 'ts-gems';

interface Row {
  id: number;
  nickname?: string;
}

type OnlyOptional = PickOptional<Row>; // { nickname?: string }
type OnlyRequired = OmitOptional<Row>; // { id: number }
```

## `DeepPickOptional<T>` / `DeepOmitOptional<T>`

The deep versions of `PickOptional`/`OmitOptional` — nested objects are
filtered the same way, recursively. Delegates to
[`DeepOmitRequired`/`DeepPickRequired`](required.md).

```ts
import type { DeepOmitOptional } from 'ts-gems';

interface Row {
  id: number;
  meta: { label?: string; note: string };
}

type Required = DeepOmitOptional<Row>;
// { id: number; meta: { note: string } }
```

## `DeeperPickOptional<T>` / `DeeperOmitOptional<T>`

Like `DeepPickOptional`/`DeepOmitOptional`, but also recurses into array
elements. Delegates to
[`DeeperOmitRequired`/`DeeperPickRequired`](required.md).

```ts
import type { DeeperOmitOptional } from 'ts-gems';

interface Row {
  tags: { label?: string; note: string }[];
}

type Required = DeeperOmitOptional<Row>;
// { tags: { note: string }[] }
```
