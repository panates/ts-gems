# OmitUndefined

Source: [`lib/omit-undefined.d.ts`](../../lib/omit-undefined.d.ts)

Removes properties whose value type is exactly `undefined` (properties
typed `T | undefined`, i.e. optional-looking-but-not-`?`, are narrowed
rather than removed unless the whole type collapses to `never`). See
[the `Deep*`/`Deeper*` convention](../api.md#the-deep--deeper-convention).

## `OmitUndefined<T>`

```ts
import type { OmitUndefined } from 'ts-gems';

type MyType = {
  a?: number;
  b: string;
  c: undefined;
};

type Result = OmitUndefined<MyType>;
// { a?: number; b: string } - `c` (exactly `undefined`) is dropped
```

## `DeepOmitUndefined<T>`

Like `OmitUndefined`, but also applies the same removal recursively to
nested object properties. Array-typed properties are left as-is.

```ts
import type { DeepOmitUndefined } from 'ts-gems';

type MyType = {
  nested: { a?: string; b: undefined };
  list: { a?: string; b: undefined }[];
};

type Result = DeepOmitUndefined<MyType>;
// {
//   nested: { a?: string };
//   list: { a?: string; b: undefined }[]; // untouched - it's an array
// }
```

## `DeeperOmitUndefined<T>`

Like `DeepOmitUndefined`, but also recurses into array elements. Tuples are
preserved as-is.

```ts
import type { DeeperOmitUndefined } from 'ts-gems';

type MyType = {
  list: { a?: string; b: undefined }[];
  pair: [string, undefined];
};

type Result = DeeperOmitUndefined<MyType>;
// { list: { a?: string }[]; pair: [string, undefined] } - tuple untouched
```
