import { PrismaUsersFavoriteAnimesRepository } from '@/repositories/prisma/prisma-users-favorite-animes-repository'
import { CreateFavoriteAnimeUseCase } from '../create-favorite-anime'

export function makeCreateUserFavoriteAnimeUseCase() {
  const usersFavoriteAnimesRepository =
    new PrismaUsersFavoriteAnimesRepository()

  const useCase = new CreateFavoriteAnimeUseCase(usersFavoriteAnimesRepository)

  return useCase
}
