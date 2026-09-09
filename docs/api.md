<!--
docs-baseline
git-commit: bfe8777ee92aea1e8cacecfa8f68e297d4235c19
package-version: 4.0.0
date: 2026-09-09
verified-against: lib/
diff-command: git diff bfe8777ee92aea1e8cacecfa8f68e297d4235c19..HEAD -- lib/
-->

<p align="center">
  <img src="logo.svg" alt="ts-gems logo" width="200" height="200" />
</p>

# API Documentation

**ts-gems** is a pure TypeScript type-declaration library (no runtime code except
twelve small `as*` cast helpers). It ships utility types for transforming,
narrowing, and inspecting other types.

```bash
npm install ts-gems --save
```

```ts
import { DeepPartial, DTO, StrictOmit } from 'ts-gems';
```

Every exported type is re-exported from the package root (`ts-gems`), so you
never need to import from a sub-path. The pages below group the exports the
same way the source does, one page per module.

## Pages

| Page                                   | Contents                                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Type Guards](api/type-check.md)       | `IfAny`, `IfNever`, `IfEquals`, `IfCompatible`, `IfTuple`, `IfClass`, `IfObject`, and 15+ more `If*` predicates |
| [Base Types](api/types.md)             | `Type`, `Class`, `Primitive`, `Builtin`, `Maybe`, `Nullish`, `Awaited`, `ElementType`, ...                      |
| [Mutable](api/mutable.md)              | `Mutable`, `DeepMutable`, `DeeperMutable`, `MutableSome`, `PickMutable`, `OmitMutable`, ...                     |
| [Readonly](api/readonly.md)            | `DeepReadonly`, `DeeperReadonly`, `ReadonlySome`, `PickReadonly`, `OmitReadonly`, ...                           |
| [Partial](api/partial.md)              | `DeepPartial`, `DeeperPartial`, `PartialSome`, `PickOptional`, `OmitOptional`, ...                              |
| [Required](api/required.md)            | `DeepRequired`, `DeeperRequired`, `RequiredSome`, `PickRequired`, `OmitRequired`, ...                           |
| [Pick](api/pick.md)                    | `StrictPick`, `PickFunctions`, `PickTypes`, `StrictPickTypes`, `FunctionKeys`, ...                              |
| [Omit](api/omit.md)                    | `StrictOmit`, `OmitFunctions`, `OmitTypes`, `DeepOmitTypes`, `DeeperOmitTypes`                                  |
| [OmitNever](api/omit-never.md)         | `OmitNever`, `DeepOmitNever`, `DeeperOmitNever`                                                                 |
| [OmitUndefined](api/omit-undefined.md) | `OmitUndefined`, `DeepOmitUndefined`, `DeeperOmitUndefined`                                                     |
| [Nullish](api/nullish.md)              | `NullishObject`, `DeepNullish`, `DeeperNullish`                                                                 |
| [UnNullish](api/non-nullable.md)       | `UnNullish`, `DeepUnNullish`, `DeeperUnNullish`                                                                 |
| [DTO](api/dto.md)                      | `DTO`, `PartialDTO`, `PatchDTO`                                                                                 |
| [Combine](api/combine.md)              | `Combine`                                                                                                       |
| [Logical](api/logical.md)              | `And`, `Or`                                                                                                     |
| [Opaque](api/opaque.md)                | `Opaque`                                                                                                        |
| [Helpers](api/helpers.md)              | `IfNoDeepValue`, `ValuesOf`                                                                                     |

## The `Deep*` / `Deeper*` convention

Several families in this library (`Mutable`, `Readonly`, `Partial`, `Required`,
`Nullish`, `UnNullish`, `OmitNever`, `OmitUndefined`, `OmitTypes`, `DTO`) come
in three strengths. Read this once — every page below assumes it:

| Variant   | Recurses into nested objects? | Recurses into array elements?                 |
| --------- | ----------------------------- | --------------------------------------------- |
| _(base)_  | No — shallow, top level only  | No                                            |
| `Deep*`   | Yes                           | No — array-typed properties are left as-is    |
| `Deeper*` | Yes                           | Yes — array element types are transformed too |

**Leaf types are never recursed into**, by any variant, including `Deeper*`.
A property is treated as a leaf (left untouched) when its type is:

- a primitive (`string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`)
- `any`
- a `Function` or a constructor/class reference (e.g. `typeof SomeClass`, `Type<T>`)
- `Map`, `ReadonlyMap`, `WeakMap`, `Set`, `ReadonlySet`, or `WeakSet`
- a **tuple** (`[string, number]`, `[]`, etc.) — a fixed-length array is left
  exactly as-is, even by `Deeper*` variants. Only _variable-length_ arrays
  (`T[]` or `readonly T[]`) have their element type transformed.
- a `Date`, `RegExp`, or any other `Builtin` (see [Base Types](api/types.md#builtin))

Both mutable (`T[]`) and readonly (`readonly T[]`) variable-length arrays are
recognized the same way. A `Deeper*` variant that transforms a `readonly T[]`
property always rebuilds it as a plain `T[]` — only the _element_ type's
readonly-ness (or lack of it) is guaranteed by the transform, not the
wrapper's; see the note on [`DeeperReadonly`](api/readonly.md#deeperreadonlyt).

```ts
import type { DeeperReadonly } from 'ts-gems';

type Config = {
  name: string;
  address: { city: string }[]; // plain array -> element type IS transformed
  range: [number, number]; // tuple -> left untouched, even by Deeper*
};

type ReadonlyConfig = DeeperReadonly<Config>;
// {
//   readonly name: string;
//   readonly address: { readonly city: string }[]; // element type made readonly
//   readonly range: [number, number]; // unchanged shape
// }
```

A **nullable** object or array property (`SomeObject | null`) still gets
recursed into — `null` is a leaf on its own, but it is preserved as a
separate union member alongside the transformed object/array, not lost:

```ts
type Config = {
  server: { host: string } | null;
};

type ReadonlyConfig = DeeperReadonly<Config>;
// { readonly server: { readonly host: string } | null }
```

## Naming patterns used across pages

- **`Pick*` / `Omit*`** — select or remove properties matching some criterion
  (readonly-ness, required-ness, function-ness, type match, ...).
- **`Strict*`** — a stricter variant of a `Pick`/`Omit` type that also excludes
  `unknown`, `any`, and `{}` from matching, and requires an exact key
  (`X extends keyof T`) rather than an arbitrary type.
- **`*Some<T, K>`** — apply a transform to only the properties named in `K`,
  leaving the rest of `T` untouched (e.g. `MutableSome<T, 'a' | 'b'>`).
- **`*Keys<T>`** — returns the union of keys matching some criterion
  (`keyof Pick*<T>`, purely for convenience).

See each page for full signatures, descriptions and runnable examples.
