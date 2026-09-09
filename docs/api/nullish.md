# Nullish

Source: [`lib/nullish.d.ts`](../../lib/nullish.d.ts)

Makes properties optional **and** nullable (`T[K] | null`) — useful for
"patch"-style inputs where a client can send `null` to explicitly clear a
field, as opposed to omitting the key to leave it unchanged. See [the
`Deep*`/`Deeper*` convention](../api.md#the-deep--deeper-convention) and
[`PatchDTO`](dto.md#patchdtot-x--never) which builds on `DeeperNullish`.

## `NullishObject<T>`

```ts
import type { NullishObject } from 'ts-gems';

interface User {
  name: string;
  age: number;
}

type PatchUser = NullishObject<User>;
// { name?: string | null; age?: number | null }
```

## `DeepNullish<T>`

Like `NullishObject`, but also makes nested object properties optional and
nullable, recursively. Array-typed properties are left as-is (only wrapped
in `| null` at their own level).

```ts
import type { DeepNullish } from 'ts-gems';

interface Config {
  name: string;
  server: { host: string; port: number };
  tags: string[];
}

type PatchConfig = DeepNullish<Config>;
// {
//   name?: string | null;
//   server?: { host?: string | null; port?: number | null } | null;
//   tags?: string[] | null;
// }
```

## `DeeperNullish<T>`

Like `DeepNullish`, but also recurses into array elements. Tuples are
preserved as-is (only wrapped in `| null`).

```ts
import type { DeeperNullish } from 'ts-gems';

interface Config {
  servers: { host: string }[];
  range: [number, number]; // tuple
}

type PatchConfig = DeeperNullish<Config>;
// {
//   servers?: ({ host?: string | null }[]) | null;
//   range?: [number, number] | null; // tuple - unchanged, just nullable
// }
```
