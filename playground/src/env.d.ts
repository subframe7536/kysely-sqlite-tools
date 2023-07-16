/// <reference types="vite/client" />
/// <reference types="kysely-wasm/official-wasm" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}