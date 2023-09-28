import {UserRepository} from "../domain/UserRepository";
import {Email, Name, User} from "../domain/User";

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async create(name: Name, email: Email) {
    const user = User.create(name, email)
    await this.userRepository.save(user)
    return user
  }

  async findAll() {
    return this.userRepository.findAll()
  }
}