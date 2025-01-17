import { PrismaUsersFavoriteAnimesRepository } from '@/repositories/prisma/prisma-users-favorite-animes-repository'
import { JikanApiAnimesRepository } from '@/repositories/jikanapi/jikanapi-animes-repository'
import { ListAnimeUseCase } from '../list-animes'

export function makeListAnimesUseCase() {
  const usersFavoriteAnimesRepository =
    new PrismaUsersFavoriteAnimesRepository()
  const jikanapiRepository = new JikanApiAnimesRepository()

  const useCase = new ListAnimeUseCase(
    jikanapiRepository,
    usersFavoriteAnimesRepository,
  )

  return useCase
}
