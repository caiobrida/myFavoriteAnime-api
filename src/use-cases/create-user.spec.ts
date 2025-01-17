import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { compare } from 'bcryptjs'
import { UsernameInUseError } from './errors/username-in-use'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create users use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      username: 'test',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the user password', async () => {
    const { user } = await sut.execute({
      username: 'test',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a new user with same username twice', async () => {
    const username = 'test'

    await sut.execute({
      username,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        username,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UsernameInUseError)
  })
})
