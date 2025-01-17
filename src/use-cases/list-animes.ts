import { AnimesRepository } from '@/repositories/animes-repository'
import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'

interface ListAnimesUseCaseRequest {
  page: number
  userId: string
}

interface ListAnimesUseCaseResponse {
  animes: {
    data: Record<string, string | boolean | number>[]
    pagination: Record<string, string | number> | null
  }
}

export class ListAnimeUseCase {
  constructor(
    private animesRepository: AnimesRepository,
    private favoriteAnimesRepository: UsersFavoriteAnimesRepository,
  ) {}

  async execute({
    page,
    userId,
  }: ListAnimesUseCaseRequest): Promise<ListAnimesUseCaseResponse> {
    const animes = await this.animesRepository.findAll(page)

    const userFavoriteAnimes =
      await this.favoriteAnimesRepository.findAll(userId)

    animes.data.forEach((a) => {
      const favFound = userFavoriteAnimes.find(
        (f) => f.animeId === String(a.mal_id),
      )

      if (favFound) {
        a.favoriteAnime = true
        a.favoriteAnimeId = favFound.id
      }
    })

    return { animes }
  }
}
