import type { QueryResult } from 'kysely'
import type { MainToWorkerMsg, WorkerToMainMsg } from '../type'
import Database from 'bun:sqlite'

let db: Database
let fn: 'query' | 'prepare'
function run(isSelect: boolean, sql: string, parameters: readonly unknown[]): QueryResult<any> {
  const stmt = db[fn](sql)
  const rows = stmt.all(parameters as any)

  if (isSelect || rows.length) {
    return { rows }
  }
  const { changes, lastInsertRowid } = db.query('SELECT 1').run()
  return {
    rows,
    insertId: BigInt(changes),
    numAffectedRows: BigInt(lastInsertRowid),
  }
}

function stream(onData: (data: any) => void, sql: string, parameters?: readonly unknown[]): void {
  const stmt = db[fn](sql)
  if (!('iterate' in stmt)) {
    throw new Error('Streaming not supported, please upgrade to Bun@^1.1.31')
  }
  for (const row of stmt.iterate(...parameters as any)) {
    onData(row)
  }
}

/**
 * Handle worker message, support custom callback on initialization
 * @example
 * // worker.ts
 * import { createOnMessageCallback } from 'kysely-bun-worker'
 *
 * createOnMessageCallback(
 *   async (db) => {
 *     db.loadExtension(...)
 *   }
 * )
 */
export function createOnMessageCallback(
  onInit?: (db: typeof Database) => void,
): (event: MessageEvent<MainToWorkerMsg>) => void {
  return ({ data: [type, data1, data2, data3] }: MessageEvent<MainToWorkerMsg>) => {
    const ret: WorkerToMainMsg = [
      type,
      null,
      null,
    ]

    try {
      switch (type) {
        case 0:
          db = new Database(data1, { create: true })
          onInit?.(db as any)
          fn = data2 ? 'query' : 'prepare'
          break
        case 1:
          ret[1] = run(data1, data2, data3 || [])
          break
        case 2:
          db.close()
          break
        case 3:
          stream(val => postMessage([3, [val], null] satisfies WorkerToMainMsg), data1, data2)
          ret[0] = 4
          break
      }
    } catch (error) {
      ret[2] = error
    }
    postMessage(ret)
  }
}
