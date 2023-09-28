import { UserUseCases } from '../use-cases/UserUseCases'
import { withPostgres } from './persistence/connection'
import { UserPostgresRepository } from './persistence/UserPostgresRepository'

export interface Dependencies {
  userUseCases: UserUseCases
}

/**
 * Poor-Mans DI container. This function sets up a new postgres connection and glues the infrastructure classes
 * with the concrete implementation classes together.
 * @param callback - callback which receives all wired dependencies
 * @example
 * withDependencies(({ userUseCases }) => {
 *   // do something with the useCase
 * })
 */
export const withDependencies = async <T>(callback: (dependencies: Dependencies) => T): Promise<T> => await withPostgres((client) => {
  const userRepository = new UserPostgresRepository(client)
  const userUseCases = new UserUseCases(userRepository)

  return callback({ userUseCases })
})
