import {describe, it} from '@jest/globals';
import {withPostgres} from "./PostgresUtils";
import {UserPostgresRepository} from "../../../src/infrastructure/persistence/UserPostgresRepository";
import {User} from "../../../src/domain/User";
import {assertThat, hasItem, hasProperty} from "hamjest";

describe("UserPostgresRepository", () => {
  describe('upsert', () => {
    it("persists user in database", withPostgres(async (client) => {
      const user = User.create("some", "some@name.com");

      const repository = new UserPostgresRepository(client)
      await repository.upsert(user)

      assertThat(await repository.findAll(),
        hasItem(hasProperty('id', user.id)))
    }));

    it("does not save record twice on subsequent calls", withPostgres(async (client) => {
      const user = User.create("some", "some@name.com");

      const repository = new UserPostgresRepository(client)
      await repository.upsert(user)
      await repository.upsert(user)

      assertThat(await repository.findAll(),
        hasProperty('length', 1))
    }));
  })
});