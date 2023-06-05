export type MainMsg =
  | {
    type: 'exec' | 'query'
    sql: string
    param?: unknown[]
  }
  | {
    type: 'close'
  }
  | {
    type: 'init'
    url: string
    dbName: string
  }

export type ExecType = {
  insertId: bigint
  numAffectedRows: bigint
}

export type WorkerMsg = {
  [K in keyof Events]: {
    type: K
    data: Events[K]
  }
}[keyof Events]
export type Events = {
  query: any[]
  exec: ExecType
  init: null
  close: null
  error: unknown
}
