import {User} from "./User";

export type Order = 'asc' | 'desc'

export interface UserRepository {
  save(user: User): Promise<User>

  findAll(order?: { createdAt: Order}): Promise<User[]>
}