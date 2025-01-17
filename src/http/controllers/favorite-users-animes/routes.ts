import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { list } from './list'
import { get } from './get'
import { create } from './create'
import { remove } from './remove'

export async function favoriteAnimesRoutes(app: FastifyInstance) {
  app.get('/favorites/list/:userId', { onRequest: [verifyJWT] }, list)
  app.get(
    '/favorites/get/:userFavoriteAnimeId',
    { onRequest: [verifyJWT] },
    get,
  )

  app.post('/favorites/create', { onRequest: [verifyJWT] }, create)
  app.delete(
    '/favorites/remove/:favoriteAnimeId',
    { onRequest: [verifyJWT] },
    remove,
  )
}
