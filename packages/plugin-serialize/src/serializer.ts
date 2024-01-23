export type Serializer = (parameter: unknown) => unknown
export type Deserializer = (parameter: unknown) => unknown

export const defaultSerializer: Serializer = (parameter) => {
  if (skipTransform(parameter) || typeof parameter === 'string') {
    return parameter
  } else if (typeof parameter === 'boolean') {
    return `${parameter}`
  } else if (parameter instanceof Date) {
    return parameter.toISOString()
  } else {
    try {
      return JSON.stringify(parameter)
    } catch (error) {
      return parameter
    }
  }
}

const dateRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/

export const defaultDeserializer: Deserializer = (parameter) => {
  if (skipTransform(parameter)) {
    return parameter
  }
  if (typeof parameter === 'string') {
    if (/^(true|false)$/.test(parameter)) {
      return parameter === 'true'
    } else if (dateRegex.test(parameter)) {
      return new Date(parameter)
    } else if (parameter.startsWith('{') && parameter.endsWith('}')){
      try {
        return JSON.parse(parameter)
      } catch (ignore) { }
    }
    return parameter
  }
}

function skipTransform(parameter: unknown) {
  return parameter === undefined
    || parameter === null
    || typeof parameter === 'bigint'
    || typeof parameter === 'number'
    || (typeof parameter === 'object' && 'buffer' in parameter)
}
