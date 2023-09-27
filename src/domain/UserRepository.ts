import {User} from "./User";

export interface UserRepository {
  upsert(user: User): Promise<User>

  findAll(): Promise<User[]>
}