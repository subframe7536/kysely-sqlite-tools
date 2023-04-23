<script setup lang="ts">
import { useDB } from './modules/mainThread'
import Worker from './modules/sqljsWorker?worker'
import OfficialWorker from './modules/officialWasmWorker?worker'
import { deleteFile } from './modules/indexeddb'
import { testCRSqlite } from './modules/crsqlite'

const worker = new Worker()
const { result, run } = useDB()
const officialWorker = new OfficialWorker()
function testSqljsMain() {
  run()
}
function testSqljsWorker() {
  worker.postMessage('')
}
function testOfficialWasm() {
  officialWorker.postMessage('')
}
async function clear() {
  console.clear()
  const root = await navigator.storage.getDirectory()
  await deleteFile('sqljs')
  await deleteFile('sqlijsWorker')
  indexedDB.deleteDatabase('idb-batch-atomic')
  try {
    await root.removeEntry('test.db')
  } catch { }
  try {
    await root.removeEntry('test.db-journal')
  } catch { }
  console.log('clear all')
}
// todo)) test
// const url = new URL('../node_modules/wa-sqlite/dist/wa-sqlite-async.wasm', import.meta.url).href
// testWaSqlite(url, 'wa-sqlite', 'create table t(a,b);insert into t (a,b) values (?,?)', [1, 2])
</script>

<template>
  <h1>
    test
    <a href="https://github.com/kysely-org/kysely" target="_blank">Kysely</a>
    WASM dialect
  </h1>
  <br>
  <h3>see worker result in console</h3>
  <h3>
    you can explore
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API#origin_private_file_system" target="_blank">
      OPFS
    </a>
    file using
    <a href="https://chrome.google.com/webstore/detail/opfs-explorer/acndjpgkpaclldomagafnognkcgjignd" target="_blank">
      opfs-explorer
    </a>
  </h3>
  <br>
  <div class="buttons">
    <button @click="testSqljsMain()">
      test sqljs in main thread
    </button>
    <button @click="testCRSqlite()">
      test crsqlite in main thread
    </button>
    <button @click="testSqljsWorker()">
      test sqljs in Worker
    </button>
    <button @click="testOfficialWasm()">
      test officialWasm in Worker
    </button>
    <button @click="clear()">
      clear
    </button>
  </div>
  <br>
  <div>
    result run in main thread:
  </div>
  <pre>
{{ result }}
  </pre>
</template>

<style>
button, a {
  font-family: sans-serif;
}
button {
  margin: 0 10px 10px;
  padding: 4px 8px;
  border-radius: 4px;
}
button:hover {
  background-color: lightblue;
  transition: 0.2s;
}
h1, h3 {
  text-align: center;
}
h1 {
  margin-bottom: 0;
}
div, pre {
  width: fit-content;
  margin: 0 auto 20px;
}
.buttons {
  display: flex;
}
pre {
  padding: 0 20px;
  border: 2px solid lightblue;
  border-radius: 8px;
  height: 340px;
  width: 340px;
  overflow-y: scroll;
}
::-webkit-scrollbar{
  width: 6px;
}
::-webkit-scrollbar-thumb{
  width: 6px;
  border-radius: 6px;
  background-color: gray;
}
</style>
