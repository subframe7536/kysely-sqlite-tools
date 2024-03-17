import type { BaseDB } from '../baseDriver'

export interface NodeWasmDBOptions {
  path: string
  options?: {
    fileMustExist?: boolean
  }
}

export interface NodeWasmDatabase extends BaseDB {
  get: (sql: string, param?: any[]) => any
  all: (sql: string, param?: any[]) => any[]
  run: (sql: string, param?: any[]) => NodeWasmRunReturn
}

export interface NodeWasmRunReturn {
  lastInsertRowid: number | bigint
  changes: number
}
