import {orderedBy} from "hamjest";
import {useFakeTimers} from "sinon";

export const orderedByPropAsc = (prop: string) =>
  orderedBy((a, b) => a[prop] < b[prop])

export const orderedByPropDesc = (prop: string) =>
  orderedBy((a, b) => a[prop] > b[prop])

export const runAtTime = <T>(date: Date, callback: () => T) => {
  const clock = useFakeTimers({now: date});
  try {
    callback()
  } finally {
    clock.restore()
  }
}