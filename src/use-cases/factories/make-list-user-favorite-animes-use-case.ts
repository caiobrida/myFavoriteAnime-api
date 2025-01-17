import { PrismaUsersFavoriteAnimesRepository } from '@/repositories/prisma/prisma-users-favorite-animes-repository'
import { ListUserFavoriteAnimeUseCase } from '../list-user-favorite-animes'

export function makeListUserFavoriteAnimeUseCase() {
  const usersFavoriteAnimesRepository =
    new PrismaUsersFavoriteAnimesRepository()

  const useCase = new ListUserFavoriteAnimeUseCase(
    usersFavoriteAnimesRepository,
  )

  return useCase
}
