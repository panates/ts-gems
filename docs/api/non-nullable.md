# UnNullish

Source: [`lib/non-nullable.d.ts`](../../lib/non-nullable.d.ts)

Removes `null` and `undefined` from every property's value type (via
`NonNullable`), and drops the key entirely if nothing is left afterwards.
See [the `Deep*`/`Deeper*` convention](../api.md#the-deep--deeper-convention).

## `UnNullish<T>`

**Shallow** — only top-level properties are un-nullished. Nested `null`/
`undefined` values, inside an object or array property, are left exactly as
they are. Use [`DeepUnNullish`](#deepunnullisht) or
[`DeeperUnNullish`](#deeperunnullisht) to reach into nested structures too.

```ts
import type { UnNullish } from 'ts-gems';

type MyType = {
  a: string | null;
  b?: number | null;
  nested: { c: string | null } | null;
};

type Result = UnNullish<MyType>;
// {
//   a: string;
//   b?: number;
//   nested: { c: string | null }; // the outer `| null` is gone, the inner one isn't
// }
```

## `DeepUnNullish<T>`

Like `UnNullish`, but also un-nullishes nested object properties,
recursively. Array-typed properties are left as-is.

```ts
import type { DeepUnNullish } from 'ts-gems';

type MyType = {
  nested: { c: string | null } | null;
  list: { c: string | null }[] | null;
};

type Result = DeepUnNullish<MyType>;
// {
//   nested: { c: string };
//   list: { c: string | null }[]; // untouched - it's an array
// }
```

## `DeeperUnNullish<T>`

Like `DeepUnNullish`, but also recurses into array elements. Tuples are
preserved as-is (their own `| null` is still stripped).

```ts
import type { DeeperUnNullish } from 'ts-gems';

type MyType = {
  list: { c: string | null }[] | null;
  pair: [string, number] | null; // tuple
};

type Result = DeeperUnNullish<MyType>;
// { list: { c: string }[]; pair: [string, number] } - tuple untouched
```
