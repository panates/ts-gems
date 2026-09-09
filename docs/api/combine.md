# Combine

Source: [`lib/combine.d.ts`](../../lib/combine.d.ts)

## `Combine<T1, T2, T3 = {}, T4 = {}>`

```ts
type Combine<T1, T2, T3 = {}, T4 = {}> = T1 &
  Omit<T2, keyof T1> &
  Omit<T3, keyof T1 | keyof T2> &
  Omit<T4, keyof T1 | keyof T2 | keyof T3>;
```

Merges up to four object types into one, **without** merging the types of
overlapping properties — unlike a plain intersection (`T1 & T2`), which
would combine both types of a shared key into `T1[K] & T2[K]`, `Combine`
lets the earliest argument win outright for any key present in more than
one input.

```ts
import type { Combine } from 'ts-gems';

interface Base {
  id: string;
  name: string;
}

interface Timestamps {
  name: Date; // overlaps with `Base.name` - Base wins
  createdAt: Date;
}

type Entity = Combine<Base, Timestamps>;
// { id: string; name: string; createdAt: Date }
// (compare to `Base & Timestamps`, where `name` would be `string & Date` = `never`)
```

Precedence follows argument order — `T1` wins over `T2`, which wins over
`T3`, which wins over `T4`:

```ts
type A = { x: 1 };
type B = { x: 2; y: 2 };
type C = { x: 3; y: 3; z: 3 };

type Result = Combine<A, B, C>;
// { x: 1; y: 2; z: 3 }
```
