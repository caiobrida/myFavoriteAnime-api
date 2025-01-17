import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      id: '1',
      username: 'test',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      username: 'test',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong username', async () => {
    await usersRepository.create({
      id: '1',
      username: 'test',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        username: 'test2',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      id: '1',
      username: 'test',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        username: 'test',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
