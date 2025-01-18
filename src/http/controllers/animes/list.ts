import { makeListAnimesUseCase } from '@/use-cases/factories/make-list-animes-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const createQuerySchema = z.object({
    page: z.coerce.number().default(1),
    search: z.coerce.string().default(''),
  })

  const createParamsSchema = z.object({
    userId: z.string(),
  })

  const { page, search } = createQuerySchema.parse(req.query)
  const { userId } = createParamsSchema.parse(req.params)

  const getUserFavoriteAnimeUseCase = makeListAnimesUseCase()

  const { animes } = await getUserFavoriteAnimeUseCase.execute({
    userId,
    page,
    search,
  })

  return res.status(200).send({ animes })
}
