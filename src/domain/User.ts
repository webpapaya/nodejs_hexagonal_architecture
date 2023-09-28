import {randomUUID} from 'crypto'
import {InvalidEmailError, NotBlankError, TypeMismatchError} from "./DomainErrors";

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
  static of(name: unknown) {
    if (typeof name !== "string") {
      throw new TypeMismatchError("String expected")
    } else if (name.length === 0) {
      throw new NotBlankError("The name of a user can't be blank")
    }
    return new Name(name)

  }
}

export class Email {
  constructor(public value: string) {}
  static of(email: unknown) {
    if (typeof email !== "string") {
      throw new TypeMismatchError("String expected")
    } else if (email.length === 0) {
      throw new NotBlankError("The email of a user can't be blank")
    } else if (!email.match(/.@./)) {
      throw new InvalidEmailError("The email provided was not valid")
    }
    return new Email(email)
  }
}