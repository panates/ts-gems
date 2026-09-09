# Pick

Source: [`lib/pick.d.ts`](../../lib/pick.d.ts)

Selecting properties by key, by kind (function vs. data), or by value type.
See [Omit](omit.md) for the inverse operations.

## `StrictPick<T, X>`

Like the built-in `Pick<T, K>`, but `X` is constrained to `keyof T`, so a
typo in the key you're picking is a compile error instead of silently
producing `never`. It only selects by key identity — it does **not** also
drop `never`-typed keys, so it stays correct when `T` is still an open
generic type parameter (e.g. used inside another generic function).

```ts
import type { StrictPick } from 'ts-gems';

interface Row {
  a?: number;
  b: string;
  c: never;
}

type Result = StrictPick<Row, 'a' | 'c'>;
// { a?: number; c: never } - both named keys are kept
```

## `PickFunctions<T>`

Keeps only the properties whose value is a function.

```ts
import type { PickFunctions } from 'ts-gems';

interface Service {
  name: string;
  start(): void;
  stop(): void;
}

type Methods = PickFunctions<Service>;
// { start(): void; stop(): void }
```

## `PickTypes<T, X>`

Keeps properties whose value type is assignable to or from `X` (a
bidirectional compatibility check, not exact equality — useful for grabbing
every property that is "roughly" of a given type, unions included).

```ts
import type { PickTypes } from 'ts-gems';

interface Row {
  a: number;
  b: string;
  c: string | number | boolean;
}

type NumberLike = PickTypes<Row, number>;
// { a: number; c: string | number | boolean }
```

## `StrictPickTypes<T, X>`

Like `PickTypes`, but additionally excludes properties typed `unknown`,
`any`, or `{}` from matching — useful when you want type-based filtering
without accidentally sweeping up untyped/loosely-typed properties.

```ts
import type { StrictPickTypes } from 'ts-gems';

interface Row {
  a: number;
  b: unknown;
  c: any;
}

type NumberLike = StrictPickTypes<Row, number>;
// { a: number } - `b` and `c` are excluded even though they're compatible
```

## `FunctionKeys<T>` / `NonFunctionKeys<T>`

Returns the union of property names whose value is (or isn't) a function.

```ts
import type { FunctionKeys, NonFunctionKeys } from 'ts-gems';

interface Service {
  name: string;
  start(): void;
}

type Methods = FunctionKeys<Service>; // 'start'
type Data = NonFunctionKeys<Service>; // 'name'
```

## `KeysOfTypes<T, X>` / `StrictKeysOfTypes<T, X>`

Returns the union of property names matching `X`, per the same rules as
[`PickTypes`](#picktypest-x)/[`StrictPickTypes`](#strictpicktypest-x)
respectively.

```ts
import type { KeysOfTypes, StrictKeysOfTypes } from 'ts-gems';

interface Row {
  a: number;
  b: string;
  c: unknown;
}

type Keys = KeysOfTypes<Row, number>; // 'a' | 'c' - `unknown` matches everything
type StrictKeys = StrictKeysOfTypes<Row, number>; // 'a' - `c` (unknown) excluded
```
