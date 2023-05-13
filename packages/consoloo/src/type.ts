export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export type LogStatus = 'Disable' | 'Normal' | 'Debug'

export type LogModule = string | Readonly<Record<string, string>>
export const LogBadge = {
  info: '#66ba66',
  debug: '#129ede',
  warn: '#e6a053',
  error: '#ee4f4f',
} as const
export const ModuleBadge = {
  BG: '#3f6894',
  FG: '#feecd8',
} as const
