import { UsernameInUseError } from '@/use-cases/errors/username-in-use'
import { makeCreateUserFavoriteAnimeUseCase } from '@/use-cases/factories/make-create-favorite-anime-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    userId: z.string(),
    animeId: z.coerce.string(),
    animeName: z.string(),
    animeEpisodes: z.coerce.string(),
    animeImage: z.string(),
  })

  const { userId, animeId, animeEpisodes, animeName, animeImage } =
    createBodySchema.parse(req.body)

  try {
    const createUserFavoriteAnimeUseCase = makeCreateUserFavoriteAnimeUseCase()

    const { favoriteAnime } = await createUserFavoriteAnimeUseCase.execute({
      userId,
      animeId,
      animeEpisodes,
      animeName,
      animeImage,
    })

    return res.status(200).send({ favoriteAnimeId: favoriteAnime.id })
  } catch (err) {
    if (err instanceof UsernameInUseError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
