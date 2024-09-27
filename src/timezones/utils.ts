export const getUTCLabel = (offset: number) => {
  const positive = Math.abs(offset)
  const time = positive.toFixed(2)
  const [hour, min] = time.split('.')

  return `${offset >= 0 ? '+' : '-'}${positive < 10 ? '0' : ''}${hour}:${min !== '00' ? 0.6 * Number(min) : min}`
}

export function parseJSON(value: string): unknown {
  return value === 'undefined' ? undefined : JSON.parse(value)
}

export function goodTry<T>(tryFn: () => T): T | undefined {
  try {
    return tryFn()
  } catch {
    //
  }

  return undefined
}

export function getFromStorage<T>(key: string): T | null {
  const storageValues =
    goodTry<string | null>(() => localStorage.getItem(key)) ?? null
  const parsedValues =
    goodTry<T>(() => parseJSON(storageValues || '') as T) ?? null

  return parsedValues
}

export function setToStorage<T>(key: string, value: T) {
  return (
    goodTry(() => {
      const string = JSON.stringify(value)
      return localStorage.setItem(key, string)
    }) ?? false
  )
}
