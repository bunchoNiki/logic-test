type Enumerate<N extends number, Acc extends number[] = []> =
  Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Key = Enumerate<256>;