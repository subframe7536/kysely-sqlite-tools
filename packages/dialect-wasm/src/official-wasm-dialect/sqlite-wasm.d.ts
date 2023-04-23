declare module '@sqlite.org/sqlite-wasm' {
  export default function sqlite3InitModule(): Promise<{ oo1: OO }>
}
type OO = {
  OpfsDb: new (path: string) => OfficialSqliteWasmDB
  DB: new (path: string) => OfficialSqliteWasmDB
}