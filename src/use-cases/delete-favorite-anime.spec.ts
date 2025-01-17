import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersFavoriteAnimesRepository } from '../repositories/in-memory/in-memory-users-favorite-animes-repository'
import { DeleteFavoriteAnimeUseCase } from './delete-favorite-anime'
import { CantDeleteFavoriteAnimeError } from './errors/cant-delete-favorite-anime'

let usersFavoriteAnimeRepository: InMemoryUsersFavoriteAnimesRepository
let sut: DeleteFavoriteAnimeUseCase

describe('Delete favorite anime use case', () => {
  beforeEach(async () => {
    usersFavoriteAnimeRepository = new InMemoryUsersFavoriteAnimesRepository()
    sut = new DeleteFavoriteAnimeUseCase(usersFavoriteAnimeRepository)
  })

  it('should be able to delete an favorite anime', async () => {
    await usersFavoriteAnimeRepository.create({
      animeId: '1',
      userId: '2',
      id: '3',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    const { success } = await sut.execute({
      favoriteAnimeId: '3',
    })

    expect(success).toBeTruthy()
  })

  it('should not be able to delete an invalid favorite anime', async () => {
    await usersFavoriteAnimeRepository.create({
      animeId: '1',
      userId: '2',
      id: '3',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    await expect(() =>
      sut.execute({
        favoriteAnimeId: '4',
      }),
    ).rejects.toBeInstanceOf(CantDeleteFavoriteAnimeError)
  })
})
