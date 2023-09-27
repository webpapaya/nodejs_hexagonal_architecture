import {describe, it} from '@jest/globals';
import {withPostgres} from "./PostgresUtils";
import {UserPostgresRepository} from "../../../src/infrastructure/persistence/UserPostgresRepository";
import {User} from "../../../src/domain/User";
import {assertThat, hasItem, hasProperty} from "hamjest";
import {runAtTime, orderedByPropAsc, orderedByPropDesc} from "../../test-utils";

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
      await runAtTime(new Date("2000-01-01"), () =>
        repository.save(User.create('first', 'first@user.com'))
      )
      await runAtTime(new Date("2000-01-02"), () =>
        repository.save(User.create('second', 'second@user.com'))
      )

      assertThat(await repository.findAll(),
        orderedByPropAsc('createdAt'))
    }))

    it('when ordered by createdAt asc, returns in correct order', withPostgres(async (client) => {
      const repository = new UserPostgresRepository(client)
      await runAtTime(new Date("2000-01-01"), () =>
        repository.save(User.create('first', 'first@user.com'))
      )
      await runAtTime(new Date("2000-01-02"), () =>
        repository.save(User.create('second', 'second@user.com'))
      )

      assertThat(await repository.findAll({createdAt: 'asc'}),
        orderedByPropAsc('createdAt'))
    }))

    it('when ordered by createdAt desc, returns in correct order', withPostgres(async (client) => {
      const repository = new UserPostgresRepository(client)
      await runAtTime(new Date("2000-01-01"), () =>
        repository.save(User.create('first', 'first@user.com'))
      )
      await runAtTime(new Date("2000-01-02"), () =>
        repository.save(User.create('second', 'second@user.com'))
      )

      assertThat(await repository.findAll({createdAt: 'desc'}),
        orderedByPropDesc('createdAt'))
    }))
  })
});

