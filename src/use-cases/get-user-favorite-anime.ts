import { UserFavoriteAnimes } from '@prisma/client'
import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'
import { FavoriteAnimeNotFoundError } from './errors/favorite-anime-not-found'

interface GetUserFavoriteAnimeUseCaseRequest {
  userFavoriteAnimeId: string
}

interface GetUserFavoriteAnimeUseCaseResponse {
  favoriteAnime: UserFavoriteAnimes
}

export class GetUserFavoriteAnimeUseCase {
  constructor(
    private favoriteAnimesRepository: UsersFavoriteAnimesRepository,
  ) {}

  async execute({
    userFavoriteAnimeId,
  }: GetUserFavoriteAnimeUseCaseRequest): Promise<GetUserFavoriteAnimeUseCaseResponse> {
    const favoriteAnime =
      await this.favoriteAnimesRepository.findById(userFavoriteAnimeId)

    if (!favoriteAnime) {
      throw new FavoriteAnimeNotFoundError()
    }

    return { favoriteAnime }
  }
}
