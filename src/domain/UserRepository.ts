import {User} from "./User";
import {TypeMismatchError} from "./DomainErrors";

export interface UserRepository {
  save(user: User): Promise<User>

  findAll(order?: { createdAt: Order }): Promise<User[]>
}

export class Order {
  static ASC = new Order('asc')
  static DESC = new Order('desc')

  constructor(private direction: 'asc' | 'desc') {}

  static of(direction: unknown) {
    if (direction === undefined || direction === 'asc') {
      return Order.ASC
    } else if (direction === 'desc') {
      return Order.DESC
    }
    throw new TypeMismatchError("Unknown direction provided")
  }
}