import {Order, UserRepository} from "../../domain/UserRepository";
import {Email, Name, User} from "../../domain/User";
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

  async findAll(order?: { createdAt: Order}): Promise<User[]> {
    const query = order?.createdAt === 'desc'
      ? USER_CREATED_AT_DESC_QUERY
      : USER_CREATED_AT_ASC_QUERY

    const result = await this.client.query(query)

    return result.rows.map((row) => new User(
      row.id,
      new Name(row.name),
      new Email(row.email),
      row.created_at
    ))
  }
}

const USER_CREATED_AT_ASC_QUERY = SQL`
      SELECT id, name, email, created_at
      FROM users
      ORDER BY created_at ASC 
  `

const USER_CREATED_AT_DESC_QUERY = SQL`
      SELECT id, name, email, created_at
      FROM users
      ORDER BY created_at DESC
  `