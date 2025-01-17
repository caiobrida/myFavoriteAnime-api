import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import { animesRoutes } from './http/controllers/animes/routes'
import { favoriteAnimesRoutes } from './http/controllers/favorite-users-animes/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '12h',
  },
})
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(animesRoutes)
app.register(favoriteAnimesRoutes)

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ msg: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(500).send({ msg: 'Internal server error' })
})
