import {UserUseCases} from "../use-cases/UserUseCases";
import {withPostgres} from "./persistence/connection";
import {UserPostgresRepository} from "./persistence/UserPostgresRepository";

type Dependencies = {
  userUseCases: UserUseCases
}

export const withDependencies = <T>(callback: (dependencies: Dependencies) => T): Promise<T> => withPostgres((client) => {
  const userRepository = new UserPostgresRepository(client)
  const userUseCases = new UserUseCases(userRepository)

  return callback({ userUseCases })
})