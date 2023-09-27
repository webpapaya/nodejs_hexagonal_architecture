import {describe, it} from "@jest/globals";
import {UserRepository} from "../../src/domain/UserRepository";
import { stubInterface } from 'ts-sinon'
import {UserUseCases} from "../../src/use-cases/UserUseCases";
import {assertThat, hasProperty} from "hamjest";

const wasCalledOnce = () =>
  hasProperty('calledOnce', true);

describe('UserUseCases', () => {
  describe('save', () => {
    it('when user can be created, calls save', async () => {
      const userRepository = stubInterface<UserRepository>()
      const useCase = new UserUseCases(userRepository)
      await useCase.create("some", "some@name.com")

      assertThat(userRepository.save, wasCalledOnce())
    })
  })
})