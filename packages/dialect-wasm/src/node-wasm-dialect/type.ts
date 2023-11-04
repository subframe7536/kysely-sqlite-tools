import type { BaseDB } from '../baseDriver'

export interface NodeWasmDBOptions {
  path: string
  options?: {
    fileMustExist?: boolean
  }
}

export interface NodeWasmDataBase extends BaseDB {
  all: (sql: string, param?: readonly unknown[]) => any[]
  run: (sql: string, param?: readonly unknown[]) => NodeWasmRunReturn
}

export interface NodeWasmRunReturn {
  lastInsertRowid: number
  changes: number | bigint
}
