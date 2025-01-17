import { UserFavoriteAnimes } from '@prisma/client'
import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'

interface CreateFavoriteAnimeUseCaseRequest {
  userId: string
  animeId: string
  animeName: string
  animeEpisodes: string
  animeImage: string
}

interface CreateFavoriteAnimeUseCaseResponse {
  favoriteAnime: UserFavoriteAnimes
}

export class CreateFavoriteAnimeUseCase {
  constructor(
    private favoriteAnimesRepository: UsersFavoriteAnimesRepository,
  ) {}

  async execute({
    userId,
    animeId,
    animeEpisodes,
    animeName,
    animeImage,
  }: CreateFavoriteAnimeUseCaseRequest): Promise<CreateFavoriteAnimeUseCaseResponse> {
    const favoriteAnime = await this.favoriteAnimesRepository.create({
      userId,
      animeId,
      animeEpisodes,
      animeName,
      animeImage,
    })

    return { favoriteAnime }
  }
}
