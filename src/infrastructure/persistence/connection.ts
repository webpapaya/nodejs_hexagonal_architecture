import {Client} from "pg";
import {migrate} from "postgres-migrations";

export const withPostgres = async <T>(callback: (client: Client) => T): Promise<T> => {
  const client = new Client({});
  await client.connect();
  await migrate({client}, "src/infrastructure/persistence/migrations")

  try {
    return await callback(client)
  } finally {
    await client.end();
  }
}