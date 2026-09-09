# Logical

Source: [`lib/logical.d.ts`](../../lib/logical.d.ts)

Compile-time boolean logic over up to six type-level "truthy" values, useful
when composing several [type guards](type-check.md) into one condition. A
value counts as "falsy" when it is `undefined`, `null`, or the literal type
`false`; anything else (including `never`... see below) counts as "truthy".

Unused trailing parameters default to the operator's identity value (`true`
for `And`, `false` for `Or`), so you can pass anywhere from 2 to 6 arguments.

## `And<T1, T2, T3?, T4?, T5?, T6?>`

`true` only if every provided argument is truthy.

```ts
import type { And } from 'ts-gems';

type A = And<true, true>; // true
type B = And<true, false>; // false
type C = And<true, true, true, true, true, true>; // true
type D = And<true, never>; // false - `never` counts as falsy here
```

A common use is combining several `If*` guards:

```ts
import type { And, IfObject, IfNever } from 'ts-gems';

type IsPlainRequiredObject<T> = And<IfObject<T>, IfNever<T, false, true>>;
```

## `Or<T1, T2, T3?, T4?, T5?, T6?>`

`true` if **any** provided argument is truthy.

```ts
import type { Or } from 'ts-gems';

type A = Or<false, false>; // false
type B = Or<false, true>; // true
type C = Or<false, false, false, false, false, true>; // true
```

This is the exact building block the [`Pick`](pick.md)/[`Omit`](omit.md)
family uses internally to combine several exclusion criteria into one key
filter — e.g. "omit this key if it's `never` **or** if it's a function".
