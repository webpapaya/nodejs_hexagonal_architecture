type Schema = { [key in string]: (value: unknown) => any }
type ParsedSchema<T extends Schema> = { [P in keyof T]: ReturnType<T[P]> }
export const parseSchema = <T extends Schema>(schema: T, body: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(schema).map(([key, value]) => {
    return [key, value(body[key])]
  })) as ParsedSchema<T>
}