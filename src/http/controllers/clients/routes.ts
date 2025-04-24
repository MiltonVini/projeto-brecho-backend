import { FastifyInstance } from 'fastify'
import { registerClient } from './register-client-controller'
import { getClientController } from './get-client-controller'
import { getAllClientesController } from './get-all-clients-controller'
import { getClientActiveBagController } from './get-client-active-bag-controller'

export async function clientRoutes(app: FastifyInstance) {
  app.post('/clients', registerClient)
  app.get('/clients/:id', getClientController)
  app.get('/clients', getAllClientesController)
  app.get('/clients/:client_id/active-bag', getClientActiveBagController)
}
