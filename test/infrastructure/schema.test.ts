import { parseSchema } from '../../src/infrastructure/schema'
import { describe, it } from '@jest/globals'
import { assertThat, equalTo } from 'hamjest'

describe('parseSchema', () => {
  it('parses object to values', () => {
    const schema = {
      number: (value: unknown) => {
        if (typeof value === 'string') {
          return parseInt(value)
        }
      }
    }

    assertThat(parseSchema(schema, { number: '1' }),
      equalTo({ number: 1 }))
  })
})
