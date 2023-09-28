type Schema = { [key in string]: (value: unknown) => any }
type ParsedSchema<T extends Schema> = { [P in keyof T]: ReturnType<T[P]> }

/**
 * Takes a schema and parses an object to the corresponding values. See tests for an example
 * @param schema - The schema to use
 * @param body - The values to parse
 */
export const parseSchema = <T extends Schema>(schema: T, body: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(schema).map(([key, value]) => {
    return [key, value(body[key])]
  })) as ParsedSchema<T>
}
