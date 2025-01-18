import { UserFavoriteAnimes, Prisma } from '@prisma/client'

export interface UsersFavoriteAnimesRepository {
  create(
    data: Partial<UserFavoriteAnimes> | Prisma.UserFavoriteAnimesCreateInput,
  ): Promise<UserFavoriteAnimes>
  findById(userFavoriteAnimeId: string): Promise<UserFavoriteAnimes | null>
  findByUser(
    userId: string,
    page: number,
    search: string,
  ): Promise<{
    data: UserFavoriteAnimes[]
    pagination: Record<string, string | number | boolean> | null
  }>
  findAll(userId: string): Promise<UserFavoriteAnimes[]>
  delete(favoriteAnimeId: string): Promise<boolean>
}
