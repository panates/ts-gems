# Type Guards

Source: [`lib/type-check.d.ts`](../../lib/type-check.d.ts)

Every type below follows the same shape:

```ts
type IfX<T, Y = true, N = false> = /* ... */;
```

It checks a condition about `T` and resolves to `Y` when the condition holds,
`N` otherwise. `Y`/`N` default to the literal types `true`/`false`, which lets
you use them directly as compile-time assertions:

```ts
import type { IfNever } from 'ts-gems';

type Check = IfNever<never>; // true
type Check2 = IfNever<string>; // false
```

...or pass real types through `Y`/`N` to build a conditional transform:

```ts
type OrString<T> = IfNever<T, string, T>; // replace `never` with `string`
```

## The `*OrAny` variants

`IfTupleOrAny`, `IfPrimitiveOrAny`, `IfObjectOrAny`, `IfFunctionOrAny`, and
`IfClassOrAny` are convenience wrappers that treat `any` as an automatic
match, since `any` would otherwise fail every structural check:

```ts
type IfXOrAny<T, Y = true, N = false> =
  IfAny<T> extends true ? Y : IfX<T, Y, N>;
```

```ts
import type { IfObject, IfObjectOrAny } from 'ts-gems';

type A = IfObject<any>; // false - `any` doesn't structurally match "object"
type B = IfObjectOrAny<any>; // true
```

## `IfAny<T, Y, N>`

Detects the `any` type specifically — distinct from `unknown`, `never`, and
every other type. Uses the well-known `0 extends 1 & T` trick, since `any` is
the only type where this holds.

```ts
import type { IfAny } from 'ts-gems';

type A = IfAny<any>; // true
type B = IfAny<unknown>; // false
type C = IfAny<never>; // false
type D = IfAny<string>; // false
```

## `IfNever<T, Y, N>`

```ts
import type { IfNever } from 'ts-gems';

type A = IfNever<never>; // true
type B = IfNever<undefined>; // false
type C = IfNever<any>; // false
```

## `IfUndefined<T, Y, N>` / `IfNull<T, Y, N>` / `IfUnknown<T, Y, N>`

Exact-type checks for `undefined`, `null`, and `unknown` respectively, each
implemented via [`IfEquals`](#ifequalst1-t2-y-n).

```ts
import type { IfNull, IfUndefined, IfUnknown } from 'ts-gems';

type A = IfUndefined<undefined>; // true
type B = IfUndefined<null>; // false

type C = IfNull<null>; // true
type D = IfNull<undefined>; // false

type E = IfUnknown<unknown>; // true
type F = IfUnknown<any>; // false - `any` is not `unknown`
```

## `IfNullish<T, Y, N>`

`true` for `null` **or** `undefined`.

```ts
import type { IfNullish } from 'ts-gems';

type A = IfNullish<null>; // true
type B = IfNullish<undefined>; // true
type C = IfNullish<0>; // false
```

## `IfSymbol<T, Y, N>`

`true` only for the general `symbol` type — **not** for a specific `unique
symbol` (e.g. the type of a `const x = Symbol('x')`), which is a distinct,
narrower type.

```ts
import type { IfSymbol } from 'ts-gems';

const uniqueSym = Symbol('x');

type A = IfSymbol<symbol>; // true
type B = IfSymbol<typeof uniqueSym>; // false - a *specific* unique symbol
type C = IfSymbol<string>; // false
```

## `IfTuple<T, Y, N>`

`true` for a fixed-length tuple (`[string, number]`, `[]`, ...); `false` for
a variable-length array (`string[]`) or anything else. Distinguishes the two
by checking whether `T['length']` is a literal number (tuple) or the general
`number` type (array).

```ts
import type { IfTuple } from 'ts-gems';

type A = IfTuple<[string, number]>; // true
type B = IfTuple<[]>; // true
type C = IfTuple<string[]>; // false
type D = IfTuple<any>; // false
```

> This is the type that decides, throughout the whole library, whether a
> tuple gets left untouched by `Deeper*` transforms instead of being
> collapsed into a homogeneous array — see [the `Deep*`/`Deeper*`
> convention](../api.md#the-deep--deeper-convention).

## `IfPrimitive<T, Y, N>`

`true` for any [`Primitive`](types.md#primitive): `string | number | bigint |
boolean | symbol | null | undefined`, plus `any`. `false` for objects,
arrays, functions, and classes.

```ts
import type { IfPrimitive } from 'ts-gems';

type A = IfPrimitive<string>; // true
type B = IfPrimitive<null>; // true
type C = IfPrimitive<{}>; // false
type D = IfPrimitive<Function>; // false
```

## `IfEmptyObject<T, Y, N>`

`true` only for the exact type `{}`.

```ts
import type { IfEmptyObject } from 'ts-gems';

type A = IfEmptyObject<{}>; // true
type B = IfEmptyObject<{ x: 1 }>; // false
type C = IfEmptyObject<undefined>; // false
```

## `IfObject<T, Y, N>`

`true` for anything structurally an `object` that isn't a primitive,
`Function`, or array (arrays get their own check via [`IfTuple`](#iftuplet-y-n)
or a plain `T[]` test elsewhere in the library).

```ts
import type { IfObject } from 'ts-gems';

type A = IfObject<{ x: 1 }>; // true
type B = IfObject<object>; // true
type C = IfObject<any[]>; // false
type D = IfObject<Function>; // false
type E = IfObject<null>; // false
```

## `IfFunction<T, Y, N>`

`true` for any function type (including arrow functions), `false` for a
constructor/class reference (see [`IfClass`](#ifclasst-y-n) for that case).

```ts
import type { IfFunction } from 'ts-gems';

class Foo {}

type A = IfFunction<() => void>; // true
type B = IfFunction<(a: string) => boolean>; // true
type C = IfFunction<typeof Foo>; // false - a constructor, not a plain function
type D = IfFunction<Foo>; // false - an instance
```

## `IfClass<T, Y, N>`

`true` when `T` is a constructor/class reference — i.e. it matches
[`Type<any>`](types.md#typet--any) (`new (...args: any[]) => any`).

```ts
import type { IfClass } from 'ts-gems';

class Foo {}
function bar() {}

type A = IfClass<typeof Foo>; // true
type B = IfClass<typeof bar>; // false
type C = IfClass<Foo>; // false - an instance is not a constructor
```

## `IfEquals<T1, T2, Y, N>`

Exact, deeply-structural type equality — the classic
[Matt McCutchen conditional-type trick](https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650),
extended in this library to also compare object shapes recursively. Two
types are equal only if they are mutually and exactly assignable, including
modifiers (`?`, `readonly`).

```ts
import type { IfEquals } from 'ts-gems';

type A = IfEquals<number, number>; // true
type B = IfEquals<number, number | string>; // false
type C = IfEquals<{ x: 1 }, { x?: 1 }>; // false - optionality differs
type D = IfEquals<any, any>; // true
type E = IfEquals<any, unknown>; // false
```

## `IfCompatible<T1, T2, Y, N>`

A looser, one- or two-way _assignability_ check (unlike `IfEquals`, which
requires exact equality). Used internally to compare function parameter/return
compatibility, and handles `any`/`unknown`/`never`/`null`/`undefined`
specially so they behave as you'd expect at the call site rather than by
strict structural rules.

```ts
import type { IfCompatible } from 'ts-gems';

type A = IfCompatible<number, number | string>; // true
type B = IfCompatible<any, number>; // true
type C = IfCompatible<{}, number>; // false
type D = IfCompatible<() => void, (a: string) => void>; // true
```
