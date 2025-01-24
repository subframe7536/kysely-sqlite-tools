import type { Promisable } from 'kysely-generic-sqlite'

export async function accessDB<T>(accessor: T | (() => Promisable<T>)): Promise<T> {
  return typeof accessor === 'function' ? await (accessor as any)() : accessor
}
