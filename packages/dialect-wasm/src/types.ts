export type Promisable<T> = T | Promise<T>

export type AnyFunction = (...args: any) => void
export interface BaseDB {
  close: () => void
}
