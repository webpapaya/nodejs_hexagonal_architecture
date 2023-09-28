import { hasProperty, orderedBy, type PropertiesMatcher } from 'hamjest'
import { useFakeTimers } from 'sinon'

export const orderedByPropAsc = (prop: string) =>
  orderedBy((a, b) => a[prop] < b[prop])

export const orderedByPropDesc = (prop: string) =>
  orderedBy((a, b) => a[prop] > b[prop])

export const wasCalledOnce = (): PropertiesMatcher =>
  hasProperty('calledOnce', true)

export const runAtTime = async <T>(date: Date, callback: () => Promise<T>) => {
  const clock = useFakeTimers({ now: date })
  try {
    await callback()
  } finally {
    clock.restore()
  }
}
