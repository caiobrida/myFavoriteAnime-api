import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersFavoriteAnimesRepository } from '../repositories/in-memory/in-memory-users-favorite-animes-repository'
import { InMemoryAnimesRepository } from '../repositories/in-memory/in-memory-animes-repository'
import { ListAnimeUseCase } from './list-animes'

let animesRepository: InMemoryAnimesRepository
let favoriteAnimesRepository: InMemoryUsersFavoriteAnimesRepository
let sut: ListAnimeUseCase

describe('List animes use case', () => {
  beforeEach(async () => {
    animesRepository = new InMemoryAnimesRepository()
    favoriteAnimesRepository = new InMemoryUsersFavoriteAnimesRepository()
    sut = new ListAnimeUseCase(animesRepository, favoriteAnimesRepository)
  })

  it('should return animes', async () => {
    animesRepository.items.data.push({
      name: 'anime 1',
      mal_id: 1,
    })

    animesRepository.items.data.push({
      name: 'anime 2',
      mal_id: 2,
    })

    const { animes } = await sut.execute({ page: 1, userId: '1' })

    expect(animes.data).toHaveLength(2)
  })

  it('should return animes with user favorites', async () => {
    animesRepository.items.data.push({
      name: 'anime 1',
      mal_id: 1,
    })

    animesRepository.items.data.push({
      name: 'anime 2',
      mal_id: 2,
    })

    favoriteAnimesRepository.create({
      animeId: '1',
      id: '1',
      userId: '1',
      animeEpisodes: '12',
      animeName: 'test',
      animeImage: 'test',
    })

    const { animes } = await sut.execute({ page: 1, userId: '1' })

    expect(animes.data).toHaveLength(2)
    expect(animes.data[0].name).toBe('anime 1')
    expect(animes.data[0].favoriteAnime).toBeTruthy()
    expect(animes.data[1].favoriteAnime).toBeFalsy()
  })

  it('should return animes paginated', async () => {
    for (let i = 0; i < 12; i++) {
      animesRepository.items.data.push({
        name: `anime ${i}`,
        mal_id: i,
      })
    }

    const { animes } = await sut.execute({ page: 2, userId: '1' })

    expect(animes.data).toHaveLength(2)
  })
})
