export * from './dialect'
export * from './driver'
export * from './type'
export * from './utils'

export function handleWebMessage(msg: MessageEvent): any {
  return msg.data
}
