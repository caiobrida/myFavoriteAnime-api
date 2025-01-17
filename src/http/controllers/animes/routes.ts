import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { list } from './list'

export async function animesRoutes(app: FastifyInstance) {
  app.get('/animes/list/:userId', { onRequest: [verifyJWT] }, list)
}
