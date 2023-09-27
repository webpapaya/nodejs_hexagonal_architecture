import {orderedBy} from "hamjest";

export const orderedByPropAsc = (prop: string) =>
  orderedBy((a, b) => a[prop] < b[prop])
export const orderedByPropDesc = (prop: string) =>
  orderedBy((a, b) => a[prop] > b[prop])