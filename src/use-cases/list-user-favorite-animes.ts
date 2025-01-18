import { UserFavoriteAnimes } from '@prisma/client'
import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'

interface ListUserFavoriteAnimeUseCaseRequest {
  userId: string
  page: number
  search: string
}

interface ListUserFavoriteAnimeUseCaseResponse {
  favoriteAnimes: {
    data: UserFavoriteAnimes[]
    pagination: Record<string, string | number | boolean> | null
  }
}

export class ListUserFavoriteAnimeUseCase {
  constructor(
    private favoriteAnimesRepository: UsersFavoriteAnimesRepository,
  ) {}

  async execute({
    userId,
    page,
    search,
  }: ListUserFavoriteAnimeUseCaseRequest): Promise<ListUserFavoriteAnimeUseCaseResponse> {
    const favoriteAnimes = await this.favoriteAnimesRepository.findByUser(
      userId,
      page,
      search,
    )

    return { favoriteAnimes }
  }
}
