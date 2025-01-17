import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersFavoriteAnimesRepository } from '../repositories/in-memory/in-memory-users-favorite-animes-repository'
import { GetUserFavoriteAnimeUseCase } from './get-user-favorite-anime'
import { FavoriteAnimeNotFoundError } from './errors/favorite-anime-not-found'

let usersFavoriteAnimeRepository: InMemoryUsersFavoriteAnimesRepository
let sut: GetUserFavoriteAnimeUseCase

describe('Get user favorite anime use case', () => {
  beforeEach(async () => {
    usersFavoriteAnimeRepository = new InMemoryUsersFavoriteAnimesRepository()
    sut = new GetUserFavoriteAnimeUseCase(usersFavoriteAnimeRepository)
  })

  it('should return user favorite anime', async () => {
    await usersFavoriteAnimeRepository.create({
      animeId: '1',
      userId: '2',
      id: '3',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    await usersFavoriteAnimeRepository.create({
      animeId: '2',
      userId: '2',
      id: '4',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    const { favoriteAnime } = await sut.execute({
      userFavoriteAnimeId: '3',
    })

    expect(favoriteAnime.animeId).toBe('1')
  })

  it('should throw on invalid user favorite anime', async () => {
    await usersFavoriteAnimeRepository.create({
      animeId: '1',
      userId: '2',
      id: '3',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    await usersFavoriteAnimeRepository.create({
      animeId: '2',
      userId: '2',
      id: '4',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    await expect(() =>
      sut.execute({
        userFavoriteAnimeId: '5',
      }),
    ).rejects.toBeInstanceOf(FavoriteAnimeNotFoundError)
  })
})
