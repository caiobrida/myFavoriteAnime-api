import { makeListUserFavoriteAnimeUseCase } from '@/use-cases/factories/make-list-user-favorite-animes-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const createParamsSchema = z.object({
    userId: z.string(),
  })

  const createQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { userId } = createParamsSchema.parse(req.params)
  const { page } = createQuerySchema.parse(req.query)

  const getUserFavoriteAnimeUseCase = makeListUserFavoriteAnimeUseCase()

  const { favoriteAnimes } = await getUserFavoriteAnimeUseCase.execute({
    userId,
    page,
  })

  return res.status(200).send({ favoriteAnimes })
}
