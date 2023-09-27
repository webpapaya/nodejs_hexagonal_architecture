import {User} from "../domain/User";

type UserRestModel = {
  id: string
  name: string,
  email: string,
  createdAt: string
}

export const mapUserToRestModel = (user: User): UserRestModel => ({
  id: user.id,
  name: user.name.value,
  email: user.email.value,
  createdAt: user.createdAt.toISOString(),
})

export const mapUsersToRestModel = (users: User[]): UserRestModel[] =>
  users.map((user) => mapUserToRestModel(user))