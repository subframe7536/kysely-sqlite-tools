import type { BaseDB } from '../types'

export interface CrSqliteDB extends BaseDB {
  execA: (sql: string, bind?: any[]) => Promise<any[]>
  execO: <T extends object>(sql: string, bind?: any[]) => Promise<T[]>
  onUpdate: (cb: (
    type: any,
    dbName: string,
    tblName: string,
    rowid: bigint
  ) => void) => void
  api: {
    changes: (db: number) => number
  }
  db: number
}
