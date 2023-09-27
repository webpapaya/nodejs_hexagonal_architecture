type UUID = string
type Name = string
type Email = string

import { randomUUID } from 'crypto'

// unique id, a name, a unique email address and a creation date
class User(
  id: UUID,
  name: Name,
  email: Email,
  createdAt: Date,
) {
  static function create(
    name: string,
    email: string,
  ) {
    return User(
    )
  }
}