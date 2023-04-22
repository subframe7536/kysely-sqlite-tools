import type { BaseDB } from '../baseDriver'

export interface CrSqliteDB extends BaseDB {
  exec(sql: string, bind?: any[]): Promise<void>
  execO<T extends {}>(sql: string, bind?: any[]): Promise<T[]>
  onUpdate(cb: (
    type: any,
    dbName: string,
    tblName: string,
    rowid: bigint
  ) => void): void
  api: {
    changes(db: number): number
  }
  db: number
}
