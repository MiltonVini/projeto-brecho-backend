import { FastifyInstance } from 'fastify'
import { getSalesByBagController } from './get-sales-by-bag-controller'
import { insertSalesController } from './insert-sales-controller'

export async function salesRoutes(app: FastifyInstance) {
  app.get('/sales/:bag_id', getSalesByBagController)
  app.post('/sales', insertSalesController)
}
