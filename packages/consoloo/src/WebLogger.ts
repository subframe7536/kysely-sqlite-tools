import { LogBadge, ModuleBadge } from './type'
import type { LogLevel, LogModule } from './type'
import type { Keys } from './baseLogger'
import { BaseLogger } from './baseLogger'

function renderBadge(fg: string, bg: string) {
  return `font-size:.8rem;padding:2px 6px;background-color:${bg};color:${fg};border-radius:4px`
}

export class WebLogger<T extends LogModule> extends BaseLogger<T> {
  public log(msg: any, level: LogLevel, source: Keys<T>, e?: unknown) {
    super.log(msg, level, source, e)
    console.group(
      `%c${level.toLocaleUpperCase()}%c %c${source ?? '🌟'}`,
      renderBadge('white', LogBadge[level]),
      'background-color:transparent',
      renderBadge(ModuleBadge.FG, ModuleBadge.BG),
    )
    console[level === 'error' ? 'error' : 'log'](msg)
    if (e instanceof Error) {
      console.error(e)
    }
    console.groupEnd()
  }

  public timer(label: string) {
    const start = performance.now()
    return () => this.debug(`${label}: ${(performance.now() - start).toFixed(2)}ms`)
  }
}
