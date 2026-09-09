# OmitNever

Source: [`lib/omit-never.d.ts`](../../lib/omit-never.d.ts)

Removes properties whose value type is `never` — handy after a chain of
conditional-type transforms leaves some properties resolved to `never`
(which should behave like "this key doesn't exist"). See [the `Deep*`/
`Deeper*` convention](../api.md#the-deep--deeper-convention).

## `OmitNever<T>`

```ts
import type { OmitNever } from 'ts-gems';

type MyType = {
  a: string;
  b: number;
  c?: never;
};

type Result = OmitNever<MyType>;
// { a: string; b: number }
```

## `DeepOmitNever<T>`

Like `OmitNever`, but also applies the same removal recursively to nested
object properties. Array-typed properties are left as-is.

```ts
import type { DeepOmitNever } from 'ts-gems';

type MyType = {
  a: string;
  nested: { b: number; c: never };
  list: { b: number; c: never }[];
};

type Result = DeepOmitNever<MyType>;
// {
//   a: string;
//   nested: { b: number };
//   list: { b: number; c: never }[]; // untouched - it's an array
// }
```

## `DeeperOmitNever<T>`

Like `DeepOmitNever`, but also recurses into array elements. Tuples are
preserved as-is.

```ts
import type { DeeperOmitNever } from 'ts-gems';

type MyType = {
  list: { b: number; c: never }[];
  pair: [string, never];
};

type Result = DeeperOmitNever<MyType>;
// { list: { b: number }[]; pair: [string, never] } - tuple untouched
```
