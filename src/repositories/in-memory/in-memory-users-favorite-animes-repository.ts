import { UserFavoriteAnimes } from '@prisma/client'
import { UsersFavoriteAnimesRepository } from '@/repositories/users-favorite-animes-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersFavoriteAnimesRepository
  implements UsersFavoriteAnimesRepository
{
  public items: {
    data: UserFavoriteAnimes[]
    pagination: Record<string, string | number> | null
  } = { data: [], pagination: null }

  async create(data: UserFavoriteAnimes) {
    const userFavoriteAnimes = {
      id: data.id || randomUUID(),
      userId: data.userId,
      animeId: data.animeId,
      animeName: data.animeName,
      animeEpisodes: data.animeEpisodes,
      animeImage: data.animeImage,
    }

    this.items.data.push(userFavoriteAnimes)

    return userFavoriteAnimes
  }

  async findById(userFavoriteAnimeId: string) {
    const userFavoriteAnimes = this.items.data.find(
      (i) => i.id === userFavoriteAnimeId,
    )

    if (!userFavoriteAnimes) return null

    return userFavoriteAnimes
  }

  async findByUser(userId: string, page: number, search: string) {
    const obj: {
      data: UserFavoriteAnimes[]
      pagination: Record<string, string | number> | null
    } = {
      data: this.items.data
        .filter((u) => u.userId === userId)
        .filter((i) => String(i.animeName).toLowerCase().includes(search))
        .slice((page - 1) * 10, page * 10),
      pagination: { page, limit: 10 },
    }

    return obj
  }

  async findAll(userId: string) {
    const userFavoriteAnimes = this.items.data.filter(
      (i) => i.userId === userId,
    )

    return userFavoriteAnimes
  }

  async delete(favoriteAnimeId: string) {
    const indexFinded = this.items.data.findIndex(
      (i) => i.id === favoriteAnimeId,
    )

    if (indexFinded === -1) {
      return false
    }

    this.items.data.splice(indexFinded, 1)

    return true
  }
}
