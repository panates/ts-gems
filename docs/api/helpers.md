# Helpers

Source: [`lib/helpers.d.ts`](../../lib/helpers.d.ts)

## `IfNoDeepValue<T>`

```ts
type IfNoDeepValue<T> = /* ... */; // true | false
```

`true` when `T` should be treated as a **leaf** by every `Deep*`/`Deeper*`
transform in this library — i.e. left untouched instead of being recursed
into. This is the type that defines "leaf" for [the `Deep*`/`Deeper*`
convention](../api.md#the-deep--deeper-convention): `true` for `any`, every
[`Builtin`](types.md#builtin) type, a [tuple](type-check.md#iftuplet-y-n), a
`Function`, a class/constructor reference, `Map`/`ReadonlyMap`/`WeakMap`/
`Set`/`ReadonlySet`/`WeakSet`, or any array; `false` for a plain object.

```ts
import type { IfNoDeepValue } from 'ts-gems';

type A = IfNoDeepValue<string>; // true
type B = IfNoDeepValue<any>; // true
type C = IfNoDeepValue<[string, number]>; // true - a tuple
type D = IfNoDeepValue<Date>; // true
type E = IfNoDeepValue<Map<string, number>>; // true
type F = IfNoDeepValue<{ a: string }>; // false - a plain object, gets recursed into
```

You'll rarely need this directly unless you're writing your own `Deep*`-style
recursive type and want it to treat leaves consistently with the rest of the
library.

## `ValuesOf<T>`

```ts
type ValuesOf<T> = T[keyof T];
```

Returns the union of every property value type in `T` — the value-side
equivalent of `keyof`.

```ts
import type { ValuesOf } from 'ts-gems';

interface Row {
  a: number;
  b: string;
  c?: boolean;
}

type Values = ValuesOf<Row>; // number | string | boolean | undefined
```

## Runtime cast helpers

Twelve tiny runtime functions, declared in
[`lib/index.d.ts`](../../lib/index.d.ts) and implemented as a no-op identity
function at runtime (`lib/index.js`). They exist purely so you can _cast_ a
value's static type without an `as` expression or reaching for a type
import at the call site:

```ts
declare function asMutable<T>(x: T): Mutable<T>;
declare function asDeepMutable<T>(x: T): DeepMutable<T>;
declare function asDeeperMutable<T>(x: T): DeeperMutable<T>;

declare function asReadonly<T>(x: T): Readonly<T>;
declare function asDeepReadonly<T>(x: T): DeepReadonly<T>;
declare function asDeeperReadonly<T>(x: T): DeeperReadonly<T>;

declare function asPartial<T>(x: T): Partial<T>;
declare function asDeepPartial<T>(x: T): DeepPartial<T>;
declare function asDeeperPartial<T>(x: T): DeeperPartial<T>;

declare function asRequired<T>(x: T): Required<T>;
declare function asDeepRequired<T>(x: T): DeepRequired<T>;
declare function asDeeperRequired<T>(x: T): DeeperRequired<T>;
```

```ts
import { asMutable } from 'ts-gems';

interface Point {
  readonly x: number;
  readonly y: number;
}

function move(p: Point) {
  const mutablePoint = asMutable(p); // same object reference, `Mutable<Point>` type
  mutablePoint.x += 1; // ok - no cast needed, and no runtime cost
}
```

Because these are real functions (not just types), they also work well with
plain JavaScript editors/tools that only understand runtime code — the
identity behavior at runtime means they're always safe to call.
