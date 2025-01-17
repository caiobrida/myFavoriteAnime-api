import { CantDeleteFavoriteAnimeError } from '@/use-cases/errors/cant-delete-favorite-anime'
import { makeDeleteUserFavoriteAnimeUseCase } from '@/use-cases/factories/make-delete-favorite-anime-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function remove(req: FastifyRequest, res: FastifyReply) {
  const createParamsSchema = z.object({
    favoriteAnimeId: z.string(),
  })

  const { favoriteAnimeId } = createParamsSchema.parse(req.params)

  try {
    const deleteUserFavoriteAnimeUseCase = makeDeleteUserFavoriteAnimeUseCase()

    await deleteUserFavoriteAnimeUseCase.execute({
      favoriteAnimeId,
    })

    return res.status(201).send()
  } catch (err) {
    if (err instanceof CantDeleteFavoriteAnimeError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
