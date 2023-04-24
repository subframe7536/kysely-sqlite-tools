declare module '@sqlite.org/sqlite-wasm' {
  export default function sqlite3InitModule(option?: { locateFile?: () => string }): Promise<{ oo1: OO }>
}
type OO = {
  OpfsDb: new (path: string) => import('kysely-wasm').OfficialWasmDB
  DB: new (path: string) => import('kysely-wasm').OfficialWasmDB
}