import { User, Prisma } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(userId: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
