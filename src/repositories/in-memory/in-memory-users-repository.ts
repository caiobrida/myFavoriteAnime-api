import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User) {
    const user = {
      id: data.id || randomUUID(),
      username: data.username,
      password: data.password,
    }

    this.items.push(user)

    return user
  }

  async findById(userId: string) {
    const user = this.items.find((i) => i.id === userId)

    if (!user) return null

    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((i) => i.username === username)

    if (!user) return null

    return user
  }
}
