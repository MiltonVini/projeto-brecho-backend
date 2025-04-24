import { FastifyInstance } from 'fastify'
import { registerUserController } from './register-user-controller'
import { authenticateUserController } from './authenticate-user-controller'
import { verifyTokenController } from './verify-token-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/authenticate', authenticateUserController)
  app.get('/verify-token', verifyTokenController)
}
