import { Client } from 'pg'
import { migrate } from 'postgres-migrations'

/**
 * Sets up a new postgres connection/runs the migrations and passes the client to the given callback.
 * @param callback
 */
export const withPostgres = async <T>(callback: (client: Client) => T): Promise<T> => {
  const client = new Client({})
  await client.connect()
  await migrate({ client }, 'src/infrastructure/persistence/migrations')

  try {
    return callback(client)
  } finally {
    await client.end()
  }
}
