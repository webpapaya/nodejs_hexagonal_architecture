import {describe, it} from '@jest/globals';
import {withPostgres} from "./PostgresUtils";

describe("UserPostgresRepository", () => {
  it("works", withPostgres(async (client) => {
      console.log(client)
  }));
});