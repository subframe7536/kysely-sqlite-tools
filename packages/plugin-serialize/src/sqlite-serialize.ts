export type Serializer = (parameter: unknown) => unknown
export type Deserializer = (parameter: unknown) => unknown
// export type BlobType = 'Uint8Array' | 'Uint16Array' | 'Uint32Array' | 'Float32Array' | 'Float64Array'
// export type BlobTypeConstructor = Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor

export const defaultSerializer: Serializer = (parameter) => {
  if (parameter === undefined
    || parameter === null
    || typeof parameter === 'bigint'
    || typeof parameter === 'number'
    || (typeof parameter === 'object' && 'buffer' in parameter)
  ) {
    return parameter
  } else if (typeof parameter === 'boolean') {
    return `${parameter}`
  } else if (parameter instanceof Date) {
    return parameter.toISOString()
  } else {
    return JSON.stringify(parameter)
  }
}
export const defaultDeserializer: Deserializer = (parameter) => {
  if (parameter === undefined
    || parameter === null
    || typeof parameter === 'bigint'
    || typeof parameter === 'number'
    || (typeof parameter === 'object' && 'buffer' in parameter)
  ) {
    return parameter
  }
  // if (typeof parameter === 'object' && 'buffer' in parameter) {
  //   return type.from(parameter as any)
  // }
  if (typeof parameter === 'string') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/
    if (/^(true|false)$/.test(parameter)) {
      return parameter === 'true'
    } else if (dateRegex.test(parameter)) {
      return new Date(parameter)
    } else {
      try {
        return JSON.parse(parameter, (_k, v) => (typeof v === 'string' && dateRegex.exec(v)) ? new Date(v) : v)
      } catch (e) { }
    }
  }
  return parameter
}
