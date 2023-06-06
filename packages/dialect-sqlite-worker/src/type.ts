export type SqlData = {
  sql: string
  parameters?: readonly unknown[]
}

export type MainMsg =
  | {
    type: 'exec' | 'query'
    sql: string
    parameters?: unknown[]
  }
  | {
    type: 'close'
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
  result: unknown
  close: null
  error: unknown
}
