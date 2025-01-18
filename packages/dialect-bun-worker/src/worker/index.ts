import Database from 'bun:sqlite'
import { createOnMessageCallback } from './utils'

createOnMessageCallback(fileName => new Database(fileName, { create: true }))
