import { PrismaUsersFavoriteAnimesRepository } from '@/repositories/prisma/prisma-users-favorite-animes-repository'
import { DeleteFavoriteAnimeUseCase } from '../delete-favorite-anime'

export function makeDeleteUserFavoriteAnimeUseCase() {
  const usersFavoriteAnimesRepository =
    new PrismaUsersFavoriteAnimesRepository()

  const useCase = new DeleteFavoriteAnimeUseCase(usersFavoriteAnimesRepository)

  return useCase
}
