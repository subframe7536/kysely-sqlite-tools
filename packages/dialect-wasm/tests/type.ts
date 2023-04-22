import type { Generated } from 'kysely/dist/cjs/util/column-type'

export interface DB {
  test: TestTable
}
interface TestTable {
  id: Generated<number>
  name: string
  blobtest: ArrayBufferLike
}
