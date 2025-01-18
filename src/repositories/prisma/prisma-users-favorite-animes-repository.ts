import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UsersFavoriteAnimesRepository } from '../users-favorite-animes-repository'

export class PrismaUsersFavoriteAnimesRepository
  implements UsersFavoriteAnimesRepository
{
  async delete(favoriteAnimeId: string) {
    const favoriteAnime = await prisma.userFavoriteAnimes.findUnique({
      where: { id: favoriteAnimeId },
    })

    if (!favoriteAnime) return false

    await prisma.userFavoriteAnimes.delete({ where: { id: favoriteAnimeId } })

    return true
  }

  async create(data: Prisma.UserFavoriteAnimesCreateInput) {
    const userFavoriteAnimes = await prisma.userFavoriteAnimes.create({
      data,
    })

    return userFavoriteAnimes
  }

  async findById(userFavoriteAnimeId: string) {
    const userFavoriteAnimes = await prisma.userFavoriteAnimes.findUnique({
      where: {
        id: userFavoriteAnimeId,
      },
    })

    return userFavoriteAnimes
  }

  async findByUser(userId: string, page: number, search: string) {
    const searchFilter = search
      ? {
          animeName: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {}

    const totalRecords = await prisma.userFavoriteAnimes.count({
      where: {
        userId,
        ...searchFilter,
      },
    })

    const userFavoriteAnimes = await prisma.userFavoriteAnimes.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: {
        userId,
        ...searchFilter,
      },
    })

    const totalPages = Math.ceil(totalRecords / 10)
    const hasNextPage = page < totalPages

    return {
      data: userFavoriteAnimes,
      pagination: {
        hasNextPage,
        totalPages,
        currentPage: page,
        totalRecords,
      },
    }
  }

  async findAll(userId: string) {
    const userFavoriteAnimes = await prisma.userFavoriteAnimes.findMany({
      where: {
        userId,
      },
    })

    return userFavoriteAnimes
  }
}
