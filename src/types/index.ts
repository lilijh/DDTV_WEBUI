import type { Response } from './response'
export type { Response, Combine, AtLeastOne, Optional, ObjEnumStringKey, ObjEnumValues }

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
type Combine<Optional, Required> = AtLeastOne<Optional> & Required
type Optional<T> = T | null

type ObjEnumStringKey<E> = {
  [K in keyof E]: keyof E[K]
}[keyof E]

type ObjEnumValues<E> = {
  [K in keyof E]: E[K][keyof E[K]]
}[keyof E]
