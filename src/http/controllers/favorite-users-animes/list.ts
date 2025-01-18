import { makeListUserFavoriteAnimeUseCase } from '@/use-cases/factories/make-list-user-favorite-animes-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const createParamsSchema = z.object({
    userId: z.string(),
  })

  const createQuerySchema = z.object({
    page: z.coerce.number().default(1),
    search: z.coerce.string().default(''),
  })

  const { userId } = createParamsSchema.parse(req.params)
  const { page, search } = createQuerySchema.parse(req.query)

  const getUserFavoriteAnimeUseCase = makeListUserFavoriteAnimeUseCase()

  const { favoriteAnimes } = await getUserFavoriteAnimeUseCase.execute({
    userId,
    page,
    search,
  })

  return res.status(200).send({ favoriteAnimes })
}
