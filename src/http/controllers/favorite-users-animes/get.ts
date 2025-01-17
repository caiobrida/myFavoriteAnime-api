import { FavoriteAnimeNotFoundError } from '@/use-cases/errors/favorite-anime-not-found'
import { makeGetUserFavoriteAnimeUseCase } from '@/use-cases/factories/make-get-user-favorite-anime-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(req: FastifyRequest, res: FastifyReply) {
  const createParamsSchema = z.object({
    userFavoriteAnimeId: z.string(),
  })

  const { userFavoriteAnimeId } = createParamsSchema.parse(req.params)

  try {
    const getUserFavoriteAnimeUseCase = makeGetUserFavoriteAnimeUseCase()

    const { favoriteAnime } = await getUserFavoriteAnimeUseCase.execute({
      userFavoriteAnimeId,
    })

    return res.status(200).send({ favoriteAnime })
  } catch (err) {
    if (err instanceof FavoriteAnimeNotFoundError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
