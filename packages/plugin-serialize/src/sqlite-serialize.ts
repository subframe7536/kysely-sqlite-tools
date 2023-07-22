export type Serializer = (parameter: unknown) => unknown
export type Deserializer = (parameter: unknown) => unknown

export const defaultSerializer: Serializer = (parameter) => {
  if (parameter === undefined
    || parameter === null
    || typeof parameter === 'bigint'
    || typeof parameter === 'string'
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
