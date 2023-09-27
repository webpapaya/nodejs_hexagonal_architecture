import {describe, it} from '@jest/globals';
import {withPostgres} from "./PostgresUtils";
import {UserPostgresRepository} from "../../../src/infrastructure/persistence/UserPostgresRepository";
import {User} from "../../../src/domain/User";
import {assertThat, hasItem, hasProperty} from "hamjest";
import {randomUUID} from "crypto";
import {orderedByPropAsc, orderedByPropDesc} from "../../custom-assertions";


describe("UserPostgresRepository", () => {
  describe('save', () => {
    it("persists user in database", withPostgres(async (client) => {
      const user = User.create("some", "some@name.com");

      const repository = new UserPostgresRepository(client)
      await repository.save(user)

      assertThat(await repository.findAll(),
        hasItem(hasProperty('id', user.id)))
    }));

    it("does not save record twice on subsequent calls", withPostgres(async (client) => {
      const user = User.create("some", "some@name.com");

      const repository = new UserPostgresRepository(client)
      await repository.save(user)
      await repository.save(user)

      assertThat(await repository.findAll(),
        hasProperty('length', 1))
    }));
  })

  describe("findAll", () => {
    it('when no ordered clause defined, returns ordered by createdAt', withPostgres(async (client) => {
      const repository = new UserPostgresRepository(client)
      await repository.save(
        new User(randomUUID(), "first", "first@user.com", new Date("2000-01-01")))
      await repository.save(
        new User(randomUUID(), "second", "second@user.com", new Date("2000-01-02")))

      assertThat(await repository.findAll(),
        orderedByPropAsc('createdAt'))
    }))

    it('when ordered by createdAt asc, returns in correct order', withPostgres(async (client) => {
      const repository = new UserPostgresRepository(client)
      await repository.save(
        new User(randomUUID(), "first", "first@user.com", new Date("2000-01-01")))
      await repository.save(
        new User(randomUUID(), "second", "second@user.com", new Date("2000-01-02")))

      assertThat(await repository.findAll({createdAt: 'asc'}),
        orderedByPropAsc('createdAt'))
    }))

    it('when ordered by createdAt desc, returns in correct order', withPostgres(async (client) => {
      const repository = new UserPostgresRepository(client)
      await repository.save(
        new User(randomUUID(), "first", "first@user.com", new Date("2000-01-01")))
      await repository.save(
        new User(randomUUID(), "second", "second@user.com", new Date("2000-01-02")))

      assertThat(await repository.findAll({createdAt: 'desc'}),
        orderedByPropDesc('createdAt'))
    }))
  })
});

