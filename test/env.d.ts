import { OfficialWasmDB } from "../packages/dialect-wasm/src/official-wasm-dialect/type";
import { NodeWasmRunReturn } from "../packages/dialect-wasm/src/node-wasm-dialect/type";
declare module '@sqlite.org/sqlite-wasm' {
  export default function sqlite3InitModule(option?: { locateFile?: () => string }): Promise<{ oo1: OO }>
}
export type OO = {
  OpfsDb: new (path: string) => OfficialWasmDB
  DB: new (path: string) => OfficialWasmDB
}
declare module 'node-sqlite3-wasm' {
  export class Database {
    constructor(path: string, options?: { fileMustExist?: boolean }) { }
    all: (sql: string, param?: any[]) => any[]
    run: (sql: string, param?: any[]) => NodeWasmRunReturn
  }
}