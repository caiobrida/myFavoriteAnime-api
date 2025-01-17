import { PrismaUsersFavoriteAnimesRepository } from '@/repositories/prisma/prisma-users-favorite-animes-repository'
import { GetUserFavoriteAnimeUseCase } from '../get-user-favorite-anime'

export function makeGetUserFavoriteAnimeUseCase() {
  const usersFavoriteAnimesRepository =
    new PrismaUsersFavoriteAnimesRepository()

  const useCase = new GetUserFavoriteAnimeUseCase(usersFavoriteAnimesRepository)

  return useCase
}
