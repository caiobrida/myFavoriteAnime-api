import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersFavoriteAnimesRepository } from '../repositories/in-memory/in-memory-users-favorite-animes-repository'
import { ListUserFavoriteAnimeUseCase } from './list-user-favorite-animes'

let usersFavoriteAnimeRepository: InMemoryUsersFavoriteAnimesRepository
let sut: ListUserFavoriteAnimeUseCase

describe('List user favorite animes use case', () => {
  beforeEach(async () => {
    usersFavoriteAnimeRepository = new InMemoryUsersFavoriteAnimesRepository()
    sut = new ListUserFavoriteAnimeUseCase(usersFavoriteAnimeRepository)
  })

  it('should return user favorite animes', async () => {
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

    const { favoriteAnimes } = await sut.execute({
      userId: '2',
      page: 1,
    })

    expect(favoriteAnimes.data).toHaveLength(2)
  })

  it('should return nothing on user favorite animes', async () => {
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

    const { favoriteAnimes } = await sut.execute({
      userId: '3',
      page: 1,
    })

    expect(favoriteAnimes.data).toHaveLength(0)
  })
})
