import { UserFavoriteAnimes } from '@prisma/client'
import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'

interface ListUserFavoriteAnimeUseCaseRequest {
  userId: string
  page: number
}

interface ListUserFavoriteAnimeUseCaseResponse {
  favoriteAnimes: {
    data: UserFavoriteAnimes[]
    pagination: Record<string, string | number> | null
  }
}

export class ListUserFavoriteAnimeUseCase {
  constructor(
    private favoriteAnimesRepository: UsersFavoriteAnimesRepository,
  ) {}

  async execute({
    userId,
    page,
  }: ListUserFavoriteAnimeUseCaseRequest): Promise<ListUserFavoriteAnimeUseCaseResponse> {
    const favoriteAnimes = await this.favoriteAnimesRepository.findByUser(
      userId,
      page,
    )

    return { favoriteAnimes }
  }
}
