import { release } from 'node:os'

export class _chalk {
  private static frontColor = ['', '']
  private static backgroundColor = ['', '']
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  private static hasFlag(flag: string, argv = globalThis.Deno ? globalThis.Deno.args : process.argv) {
    const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--')
    const position = argv.indexOf(prefix + flag)
    const terminatorPosition = argv.indexOf('--')
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition)
  }

  /**
   * from {@link https://github.com/termstandard/colors#truecolor-support-in-output-devices colors}
   * and {@link https://github.com/chalk/chalk/blob/a370f468a43999e4397094ff5c3d17aadcc4860e/source/vendor/supports-color/index.js#L59 chalk}
  */
  public static isTrueColorSupported = typeof process !== 'undefined'
    && (process.stdout?.isTTY
      || process.env.TERM?.includes('xterm')
      || process.env.COLORTERM === 'truecolor'
      || (process.env.TERM && /^truecolor$/i.test(process.env.TERM))
      || (Number(release().split('.')[0]) >= 10 && Number(release().split('.')[2]) >= 14_931)
      || ('CI' in process.env && 'GITHUB_ACTIONS' in process.env)
      || this.hasFlag('color=16m')
      || this.hasFlag('color=full')
      || this.hasFlag('color=truecolor')
      || (process.env.TERM_PROGRAM === 'iTerm.app'
        && ~~(process.env.TERM_PROGRAM_VERSION || '').split('.')[0] >= 3))

  /**
   * from {@link https://github.com/chalk/ansi-styles/blob/main/index.js#L7 chalk}
   */
  private static wrapAnsi16m(offset: number, close: string, red: number, green: any, blue: number) {
    return [`\u001B[${38 + offset};2;${red};${green};${blue}m`, close]
  }

  public static bgColor(color: string) {
    this.backgroundColor = this.wrapAnsi16m(10, '\u001B[49m', ...this.hexToRgb(color))
    return this
  }

  public static color(color: string) {
    this.frontColor = this.wrapAnsi16m(0, '\u001B[39m', ...this.hexToRgb(color))
    return this
  }

  public static content(content: string) {
    const [start, end] = this.frontColor
    const [bgStart, bgEnd] = this.backgroundColor
    this.reset()
    return `${bgStart}${start}${content}${end}${bgEnd}`
  }

  public static reset() {
    this.backgroundColor = ['', '']
    this.frontColor = ['', '']
  }

  private static hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace('#', '').toLowerCase()
    if (!/^[0-9a-f]{3}([0-9a-f]{3})?$/.test(hex)) {
      return [0, 0, 0]
    }
    const parts = (hex.length === 3)
      ? hex.split('').map(c => parseInt(c.repeat(2), 16))
      : hex.match(/.{2}/g)!.map(c => parseInt(c, 16))

    return [parts[0], parts[1], parts[2]]
  }
}
