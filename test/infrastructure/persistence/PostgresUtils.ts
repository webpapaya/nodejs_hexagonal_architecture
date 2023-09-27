import {Client} from "pg";
import {PostgreSqlContainer} from "@testcontainers/postgresql";

export const withPostgres = (test: (client: Client) => unknown) => async () => {
  const container = await new PostgreSqlContainer().start();
  const client = new Client({
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword(),
  });
  await client.connect();

  try {
    return await test(client)
  } finally {
    await client.end();
    await container.stop();
  }
}