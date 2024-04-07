import type { Response } from './response'
export type {
  Response,
  Combine,
  AtLeastOne,
  Optional,
  InnerObjectValuesOfType,
  InnerObjectKeysOfType
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
type Combine<Optional, Required> = AtLeastOne<Optional> & Required
type Optional<T> = T | null

type InnerObjectKeysOfType<T> = {
  [K in keyof T]: keyof T[K]
}[keyof T]

type InnerObjectValuesOfType<T> = {
  [K in keyof T]: T[K][keyof T[K]]
}[keyof T]
