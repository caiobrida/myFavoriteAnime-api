import { UsernameInUseError } from '@/use-cases/errors/username-in-use'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  })

  const { username, password } = createBodySchema.parse(req.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    await createUserUseCase.execute({
      username,
      password,
    })

    return res.status(201).send()
  } catch (err) {
    if (err instanceof UsernameInUseError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
