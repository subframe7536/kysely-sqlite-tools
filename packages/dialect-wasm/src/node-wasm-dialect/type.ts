export interface NodeWasmDBOptions {
  path: string
  options?: {
    fileMustExist?: boolean
  }
}

export interface NodeWasmDataBase {
  all: (sql: string, param?: any[]) => any[]
  run: (sql: string, param?: any[]) => NodeWasmRunReturn
}

export interface NodeWasmRunReturn {
  lastInsertRowid: number
  changes: number | bigint
}
