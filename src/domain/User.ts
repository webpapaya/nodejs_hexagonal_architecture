import {randomUUID} from 'crypto'
import {InvalidEmailError, NotBlankError} from "./DomainErrors";

type UUID = string

export class User {
  constructor(
    public id: UUID,
    public name: Name,
    public email: Email,
    public createdAt: Date,
  ) {}

  static create(name: string, email: string): User {
    return new User(randomUUID(), Name.of(name), Email.of(email), new Date())
  }
}

export class Name {
  constructor(public value: string) {}
  static of(name: string) {
    if (name.length > 0) {
      return new Name(name)
    }
    throw new NotBlankError("The name of a user can't be blank")
  }
}

export class Email {
  constructor(public value: string) {}
  static of(email: string) {
    if (email.length === 0) {
      throw new NotBlankError("The email of a user can't be blank")
    } else if (!email.match(/.@./)) {
      throw new InvalidEmailError("The email provided was not valid")
    }
    return new Email(email)
  }
}