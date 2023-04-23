const DB_NAME = 'sqlitevfs'
const LOADED_FILES = new Map()
const OPEN_FILES = new Map()

function getOpenFile(rid: any) {
  if (!OPEN_FILES.has(rid)) {
    throw new Error(`Resource ID ${rid} does not exist.`)
  }
  return OPEN_FILES.get(rid)
}

const MIN_GROW_BYTES = 2048
const MAX_GROW_BYTES = 65536

class _Buffer {
  _data: Uint8Array
  _size: any
  constructor(data: Uint8Array) {
    this._data = data ?? new Uint8Array()
    this._size = this._data.length
  }

  get size() {
    return this._size
  }

  read(offset: number, buffer: { length: any; set: (arg0: any) => void }) {
    if (offset >= this._size) {
      return 0
    }
    const toCopy = this._data.subarray(
      offset,
      Math.min(this._size, offset + buffer.length),
    )
    buffer.set(toCopy)
    return toCopy.length
  }

  reserve(capacity: number) {
    if (this._data.length >= capacity) {
      return
    }
    const neededBytes = capacity - this._data.length
    const growBy = Math.min(
      MAX_GROW_BYTES,
      Math.max(MIN_GROW_BYTES, this._data.length),
    )
    const newArray = new Uint8Array(
      this._data.length + Math.max(growBy, neededBytes),
    )
    newArray.set(this._data)
    this._data = newArray
  }

  write(offset: any, buffer: any[]) {
    this.reserve(offset + buffer.length)
    this._data.set(buffer, offset)
    this._size = Math.max(this._size, offset + buffer.length)
    return buffer.length
  }

  truncate(size: any) {
    this._size = size
  }

  toUint8Array() {
    return this._data.subarray(0, this._size)
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
// @ts-ignore
const indexedDB = self.indexedDB || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

// Web browser indexedDB database
const database: Promise<IDBDatabase> = new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, 1)
  request.onupgradeneeded = () =>
    request.result.createObjectStore('files', { keyPath: 'name' })
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
})

export async function loadFile(fileName: string) {
  const db = await database
  const file = await new Promise((resolve, reject) => {
    const store = db.transaction('files', 'readonly').objectStore('files')
    const request = store.get(fileName)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  }) as { data: Uint8Array }

  if (file && !LOADED_FILES.has(fileName)) {
    const buffer = new _Buffer(file.data)
    LOADED_FILES.set(fileName, buffer)
    return buffer
  } else if (LOADED_FILES.has(fileName)) {
    return LOADED_FILES.get(fileName)
  } else {
    return null
  }
}

async function syncFile(fileName: string, data: Uint8Array) {
  const db = await database
  await new Promise((resolve, reject) => {
    const store = db.transaction('files', 'readwrite').objectStore('files')
    const request = store.put({ name: fileName, data })
    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

export async function deleteFile(fileName: string) {
  const db = await database
  await new Promise((resolve, reject) => {
    const store = db.transaction('files', 'readwrite').objectStore('files')
    const request = store.delete(fileName)
    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

// from deno-sqlite
export async function writeFile(fileName: string, data: Uint8Array) {
  await syncFile(fileName, data)
  if (LOADED_FILES.has(fileName)) {
    const buffer = LOADED_FILES.get(fileName)
    buffer.truncate(0)
    buffer.write(0, data)
  }
}
