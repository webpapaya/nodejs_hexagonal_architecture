import { randomUUID } from 'crypto'

type UUID = string
type Name = string
type Email = string

export class User {
  constructor(
    public id: UUID,
    public name: Name,
    public email: Email,
    public createdAt: Date,
  ) {}

  static create(name: string, email: string): User {
    return new User(randomUUID(), name, email, new Date())
  }
}