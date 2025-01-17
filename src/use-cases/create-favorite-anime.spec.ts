import { beforeEach, describe, expect, it } from 'vitest'
import { CreateFavoriteAnimeUseCase } from './create-favorite-anime'
import { InMemoryUsersFavoriteAnimesRepository } from '../repositories/in-memory/in-memory-users-favorite-animes-repository'

let usersFavoriteAnimeRepository: InMemoryUsersFavoriteAnimesRepository
let sut: CreateFavoriteAnimeUseCase

describe('Create favorite anime use case', () => {
  beforeEach(async () => {
    usersFavoriteAnimeRepository = new InMemoryUsersFavoriteAnimesRepository()
    sut = new CreateFavoriteAnimeUseCase(usersFavoriteAnimeRepository)
  })

  it('should be able to create an favorite anime', async () => {
    const { favoriteAnime } = await sut.execute({
      animeId: '2',
      userId: '3',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    expect(favoriteAnime.id).toEqual(expect.any(String))
  })
})
