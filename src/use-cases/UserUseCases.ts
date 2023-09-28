import { type Order, type UserRepository } from '../domain/UserRepository'
import { type Email, type Name, User } from '../domain/User'

export class UserUseCases {
  constructor (private readonly userRepository: UserRepository) {}

  async create (name: Name, email: Email) {
    const user = User.create(name, email)
    await this.userRepository.save(user)
    return user
  }

  async findAll (order: { createdAt: Order }) {
    return await this.userRepository.findAll(order)
  }
}
