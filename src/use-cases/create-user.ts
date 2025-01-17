import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'
import { hash } from 'bcryptjs'
import { UsernameInUseError } from './errors/username-in-use'

interface CreateUserUseCaseRequest {
  username: string
  password: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameUsername =
      await this.usersRepository.findByUsername(username)

    if (userWithSameUsername) {
      throw new UsernameInUseError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      password: passwordHash,
      username,
    })

    return { user }
  }
}
