import {UserRepository} from "../../domain/UserRepository";
import {User} from "../../domain/User";
import {Client} from "pg";
import SQL from "sql-template-strings";

export class UserPostgresRepository implements UserRepository {
  constructor(private client: Client) {}

  async save(user: User): Promise<User> {
    await this.client.query(SQL`
      insert into users (id, name, email, created_at)
      values(${user.id}, ${user.name}, ${user.email}, ${user.createdAt.toISOString()})
      ON CONFLICT (id)
      DO UPDATE SET name = EXCLUDED.name,
                    email = EXCLUDED.email
    `)

    return user
  }

  async findAll(): Promise<User[]> {
    const result = await this.client.query(SQL`
      select id, name, email, created_at
      from users
    `)

    return result.rows.map((row) => new User(
      row.id,
      row.name,
      row.email,
      row.created_at
    ))
  }
}