import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = createBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ username, password })

    const token = await res.jwtSign(
      { username: user.username },
      { sign: { sub: user.id } },
    )

    const refreshToken = await res.jwtSign(
      { username: user.username },
      {
        sign: { sub: user.id, expiresIn: '7d' },
      },
    )

    return res
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(409).send({ msg: err.message })
    }

    throw err
  }
}
