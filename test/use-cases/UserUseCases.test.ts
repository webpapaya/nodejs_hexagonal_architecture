import {describe, it} from "@jest/globals";
import {UserRepository} from "../../src/domain/UserRepository";
import { stubInterface } from 'ts-sinon'
import {UserUseCases} from "../../src/use-cases/UserUseCases";
import {assertThat, hasProperty} from "hamjest";
import {Email, Name} from "../../src/domain/User";

const wasCalledOnce = () =>
  hasProperty('calledOnce', true);

describe('UserUseCases', () => {
  describe('save', () => {
    it('when user can be created, calls save', async () => {
      const userRepository = stubInterface<UserRepository>()
      const useCase = new UserUseCases(userRepository)
      await useCase.create(Name.of("some"), Email.of("some@name.com"))

      assertThat(userRepository.save, wasCalledOnce())
    })
  })
})