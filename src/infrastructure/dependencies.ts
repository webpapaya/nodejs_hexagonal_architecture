import { UserUseCases } from '../use-cases/UserUseCases'
import { withPostgres } from './persistence/connection'
import { UserPostgresRepository } from './persistence/UserPostgresRepository'

export interface Dependencies {
  userUseCases: UserUseCases
}

export const withDependencies = async <T>(callback: (dependencies: Dependencies) => T): Promise<T> => await withPostgres((client) => {
  const userRepository = new UserPostgresRepository(client)
  const userUseCases = new UserUseCases(userRepository)

  return callback({ userUseCases })
})
