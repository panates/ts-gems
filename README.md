<p align="center">
  <img src="docs/logo.svg" alt="ts-gems logo" width="200" height="200" />
</p>

# ts-gems

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![CI Tests][ci-test-image]][ci-test-url]

**Think of it as lodash — but every function operates on `types`, not values, and runs at compile time for free.**

Quick question: what's the type of `Partial<{ user: { name: string } }>['user']`?

If you guessed `{ name?: string }`, that's the intuitive answer — and it's wrong.
TypeScript's built-in `Partial<T>` only reaches the *first* level. The real
answer is `{ name: string }` — still fully required underneath, still ready
to blow up at runtime the moment you try to build one incrementally.

```ts
type Config = { user: { name: string; age: number } };

type Shallow = Partial<Config>;
// { user?: { name: string; age: number } }   <- still required inside!

type Deep = DeepPartial<Config>;
// { user?: { name?: string; age?: number } }  <- actually usable
```

That one gap is the whole reason this library exists. `Partial`, `Required`,
`Readonly`, and `Pick`/`Omit` all share the same blind spot: they stop at the
surface. ts-gems finishes what TypeScript started — and then keeps going into
places you didn't know needed a type yet.

## A few things that might surprise you

**Freeze a config tree, arrays included, in one line:**

```ts
import type { DeeperReadonly } from 'ts-gems';

type FrozenConfig = DeeperReadonly<{
  servers: { host: string; port: number }[];
}>;
// every level is readonly — including inside the array elements
```

**Turn any interface into an API-safe DTO — no functions, no symbols, recursively:**

```ts
import type { DTO } from 'ts-gems';

class User {
  name = '';
  greet() {}
  [Symbol.iterator]() {}
}

type UserResponse = DTO<User>;
// { name: string } — methods and symbol keys are gone, nested objects too
```

**Stop mixing up two `number`s that were never meant to meet:**

```ts
import type { Opaque } from 'ts-gems';

type UserId = Opaque<number, 'UserId'>;
type OrderId = Opaque<number, 'OrderId'>;

function cancelOrder(id: OrderId) {
  /* ... */
}

declare const userId: UserId;
cancelOrder(userId); // ✗ compile error — nominally different, even though both are `number`
```

**Merge types without the intersection trap:**

```ts
type A = { name: string };
type B = { name: Date }; // overlapping key, different type

type Bad = A & B; // name: string & Date — a type nothing can satisfy. Oops.
type Good = Combine<A, B>; // { name: string } — A simply wins
```

None of this is magic. It's ~60 small, focused utility types, each solving
one specific gap — composable, dependency-free, and fully documented with
runnable examples.

## Explore the full toolkit

📖 **[Browse the complete API reference →](docs/api.md)**

| Category | What it does |
| --- | --- |
| [`Deep*` / `Deeper*` family](docs/api.md#the-deep--deeper-convention) | `Mutable`, `Readonly`, `Partial`, `Required`, `Nullish` — that finally reach nested objects and arrays |
| [`DTO` / `PartialDTO` / `PatchDTO`](docs/api/dto.md) | Turn any class or interface into a clean transfer-object shape |
| [`Pick` / `Omit` family](docs/api/pick.md) | Select by key, by function-vs-data, or by matching value type |
| [`Opaque`](docs/api/opaque.md) | Nominal typing / branded primitives for TypeScript's structural type system |
| [`Combine`](docs/api/combine.md) | Merge types without the `&` intersection trap |
| [20+ type guards](docs/api/type-check.md) | `IfAny`, `IfNever`, `IfEquals`, `IfTuple`, `IfCompatible`, and more, for building your own conditional types |
| [`And` / `Or`](docs/api/logical.md) | Compile-time boolean logic to combine several guards into one |

## Installation

```bash
npm install ts-gems --save
```

```ts
import { DeepPartial, DTO, Opaque, StrictOmit } from 'ts-gems';
```

Everything is exported from the package root — no sub-path imports, no
runtime cost. It's types all the way down (with twelve tiny `as*` cast
helpers thrown in, purely for ergonomics).

## Node Compatibility

- node >= 16.x

## License

ts-gems is available under the [MIT](LICENSE) license.

[npm-image]: https://img.shields.io/npm/v/ts-gems
[npm-url]: https://npmjs.org/package/ts-gems
[ci-test-image]: https://github.com/panates/ts-gems/actions/workflows/test.yml/badge.svg
[ci-test-url]: https://github.com/panates/ts-gems/actions/workflows/test.yml
[coveralls-image]: https://img.shields.io/coveralls/panates/ts-gems/master.svg
[coveralls-url]: https://coveralls.io/r/panates/ts-gems
[downloads-image]: https://img.shields.io/npm/dm/ts-gems.svg
[downloads-url]: https://npmjs.org/package/ts-gems
[gitter-image]: https://badges.gitter.im/panates/ts-gems.svg
[gitter-url]: https://gitter.im/panates/ts-gems?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[dependencies-image]: https://david-dm.org/panates/ts-gems/status.svg
[dependencies-url]:https://david-dm.org/panates/ts-gems
[devdependencies-image]: https://david-dm.org/panates/ts-gems/dev-status.svg
[devdependencies-url]:https://david-dm.org/panates/ts-gems?type=dev
[quality-image]: http://npm.packagequality.com/shield/ts-gems.png
[quality-url]: http://packagequality.com/#?package=ts-gems
