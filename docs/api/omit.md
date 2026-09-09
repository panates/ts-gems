# Omit

Source: [`lib/omit.d.ts`](../../lib/omit.d.ts)

Removing properties by key, by kind (function vs. data), or by value type.
See [Pick](pick.md) for the inverse operations, and [the `Deep*`/`Deeper*`
convention](../api.md#the-deep--deeper-convention) for `DeepOmitTypes`/
`DeeperOmitTypes`.

## `StrictOmit<T, X>`

Like the built-in `Omit<T, K>`, but `X` is constrained to `keyof T`, so a
typo in the key you're omitting is a compile error instead of a silent
no-op. Unlike [`StrictPick`](pick.md#strictpickt-x), it does **not** also
drop `never`-typed keys — only the key(s) named in `X` are removed, by
identity, regardless of their value type.

```ts
import type { StrictOmit } from 'ts-gems';

interface Row {
  a?: number;
  b: string;
  c: never;
}

type Result = StrictOmit<Row, 'b'>;
// { a?: number; c: never } - only `b` is removed
```

## `OmitFunctions<T>`

Removes every property whose value is a function — the inverse of
[`PickFunctions`](pick.md#pickfunctionst).

```ts
import type { OmitFunctions } from 'ts-gems';

interface Service {
  name: string;
  start(): void;
}

type Data = OmitFunctions<Service>;
// { name: string }
```

## `OmitTypes<T, X>`

Removes properties whose value type is assignable to or from `X`, and
narrows the remaining properties' types by excluding `X` from their union
(via `Exclude<T[K], X>`) — the inverse of
[`PickTypes`](pick.md#picktypest-x).

```ts
import type { OmitTypes } from 'ts-gems';

interface Row {
  a: number;
  b: boolean;
  c: string | number | boolean;
}

type Result = OmitTypes<Row, number>;
// { b: boolean; c: string | boolean } - `a` is dropped, `number` removed from `c`
```

## `DeepOmitTypes<T, X>`

Like `OmitTypes`, but also applies the same removal recursively to nested
object properties. Array-typed properties are left as-is.

```ts
import type { DeepOmitTypes } from 'ts-gems';

interface Row {
  a: number;
  nested: { a: number; b: string };
}

type Result = DeepOmitTypes<Row, number>;
// { nested: { b: string } }
```

## `DeeperOmitTypes<T, X>`

Like `DeepOmitTypes`, but also recurses into array elements. Tuples are
preserved as-is.

```ts
import type { DeeperOmitTypes } from 'ts-gems';

interface Row {
  items: { a: number; b: string }[];
  pair: [string, number]; // tuple
}

type Result = DeeperOmitTypes<Row, number>;
// { items: { b: string }[]; pair: [string, number] } - tuple untouched
```
