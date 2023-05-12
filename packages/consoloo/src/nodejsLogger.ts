import { performance } from 'node:perf_hooks'
import { dirname } from 'node:path'
import { appendFile } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import { _chalk } from './chalk'
import { LogBadge, ModuleBadge } from './type'
import type { LogLevel, LogModule } from './type'
import type { Option } from './baseLogger'
import { BaseLogger } from './baseLogger'

function getMsg(msg: any, e?: unknown) {
  let _msg = ''
  switch (typeof msg) {
    case 'undefined':
      _msg = ''
      break
    case 'object':
      _msg = msg instanceof Error
        ? msg.message
        : JSON.stringify(msg, null, 2)
      break
    case 'symbol':
      _msg = msg.toString()
      break
    case 'number':
    case 'bigint':
    case 'boolean':
    case 'function':
      _msg = msg.toString()
      break
  }
  if (e instanceof Error) {
    _msg += `\n${e.stack}`
  }
  return _msg
}

function getReadableLog<T>(
  inFile: boolean,
  time: string,
  msg: any,
  level: LogLevel,
  source?: T,
  e?: unknown,
) {
  let _level = ` ${level.toUpperCase()} `
  let _msg = getMsg(msg, e)
  let _source = ` ${source ?? ''} `
  let _time = `[${time}]`

  if (!inFile && _chalk.isTrueColorSupported) {
    _msg = _chalk.color('#d9eeff').content(_msg)
    _level = _chalk.bgColor(LogBadge[level]).color('#ffffff').content(_level)
    _source = _chalk.bgColor(ModuleBadge.BG).color(ModuleBadge.FG).content(_source)
    _time = _chalk.color('#888888').content(_time)
  }
  return `${_time} ${_level}${_source}: ${_msg}`
}

export interface NodejsLoggerOption extends Option {
  errorPath?: string
}

export class NodejsLogger<T extends LogModule> extends BaseLogger<T> {
  public errorPath: string | undefined
  public constructor(option: NodejsLoggerOption) {
    const { logStatus, errorPath } = option
    super({ logStatus })
    this.errorPath = errorPath
    if (errorPath) {
      const dirPath = dirname(errorPath)
      !existsSync(dirPath) && mkdirSync(dirPath, { recursive: true })
    }
  }

  public log(msg: any, level: LogLevel, source?: T[keyof T], e?: unknown) {
    const time = new Date().toLocaleString()
    console[level === 'error' ? 'error' : 'log'](getReadableLog(false, time, msg, level, source, e))
    level === 'error'
      && this.errorPath
      && appendFile(this.errorPath, `${getReadableLog(true, time, msg, level, source, e)}\n`)
  }

  public timer(label: string) {
    const start = performance.now()
    return () => this.debug(`${label}: ${(performance.now() - start).toFixed(2)}ms`)
  }
}
