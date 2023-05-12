import type { LogLevel, LogModule, LogStatus } from './type'

type Keys<T> = T[keyof T]

export interface Logger<T = any> {
  status: LogStatus
  log: (msg: any, level: LogLevel, source: Keys<T>, e?: Error) => void
  info: (msg: any, source: Keys<T>) => void
  debug: (msg: any) => void
  warn: (msg: any, source: Keys<T>) => void
  error: (msg: any, source: Keys<T>, e?: Error | undefined) => void
  timer: (label: string) => () => void
}
export interface Option {
  logStatus: LogStatus
}
export abstract class BaseLogger<T extends LogModule> implements Logger<T> {
  public status: LogStatus
  public constructor({ logStatus }: Option) {
    this.status = logStatus
  }

  private filter(msg: any, level: LogLevel, source: Keys<T> | undefined, e?: unknown) {
    if (this.status === 'Disable'
      || (this.status === 'Normal' && level === 'debug')) {
      return
    }
    this.log(msg, level, source, e)
  }

  public abstract log(msg: any, level: LogLevel, source: Keys<T> | undefined, e?: unknown): void
  public info(msg: any, source: Keys<T>) {
    this.filter(msg, 'info', source)
  }

  public debug(msg: any, source?: Keys<T>) {
    this.filter(msg, 'debug', source)
  }

  public warn(msg: any, source: Keys<T>) {
    this.filter(msg, 'warn', source)
  }

  public error(msg: any, source: Keys<T>, e?: Error | unknown) {
    this.filter(msg, 'error', source, e)
  }

  public timer(label: string) {
    console.time(label)
    return () => {
      console.timeEnd(label)
    }
  }
}
