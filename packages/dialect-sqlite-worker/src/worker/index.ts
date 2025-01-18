import Database from 'better-sqlite3'
import { createOnMessageCallback } from './utils'

createOnMessageCallback((...args) => new Database(...args))
