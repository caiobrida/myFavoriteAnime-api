import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'
import { CantDeleteFavoriteAnimeError } from './errors/cant-delete-favorite-anime'

interface DeleteFavoriteAnimeUseCaseRequest {
  favoriteAnimeId: string
}

interface DeleteFavoriteAnimeUseCaseResponse {
  success: boolean
}

export class DeleteFavoriteAnimeUseCase {
  constructor(
    private favoriteAnimesRepository: UsersFavoriteAnimesRepository,
  ) {}

  async execute({
    favoriteAnimeId,
  }: DeleteFavoriteAnimeUseCaseRequest): Promise<DeleteFavoriteAnimeUseCaseResponse> {
    const success = await this.favoriteAnimesRepository.delete(favoriteAnimeId)

    if (!success) {
      throw new CantDeleteFavoriteAnimeError()
    }

    return { success }
  }
}
